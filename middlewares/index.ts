import { NextRequest, NextResponse } from "next/server";
import { LoginInputschema, RegisterInputschema } from "../lib/validation/valSchema";
import { isVerified, verifyJwtToken } from "@/lib";


export async function regmiddleware(request: NextRequest) {
  try {
    let InputData = await request.json();
    InputData = await RegisterInputschema.validate(InputData, { strict: true, abortEarly: false })
  } catch (error: any) {
    return NextResponse.json({ error, msg: "Validation" })
  }
  const response = NextResponse.next()

  response.cookies.set('region', 'pk')
  return response
}

export async function logmiddleware(request: NextRequest) {
  try {
    let InputData = await request.json();
    InputData = await LoginInputschema.validate(InputData, { strict: true, abortEarly: false })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 400 })
  }

  const user = await isVerified(request)

  if (user) {
    // If the token is verify
    return NextResponse.json({ message: "Already login", success: true }, { status: 200 })
  }
  // if the token is not verify 
  const response = NextResponse.next()
  response.cookies.delete("user-token");
  response.cookies.set('region', 'pk')
  return response
}


export async function browseMiddleware(request: NextRequest) {
  const user = await isVerified(request)
  if (user) {
    return NextResponse.next();
  }
  const auth = new URL('/auth', request.url);
  return NextResponse.redirect(auth)
}


export async function authmiddleware(request: NextRequest) {
  const user = await isVerified(request)
  const browse = new URL('/browse', request.url);
  if (user) {
    return NextResponse.redirect(browse)
  }
}


