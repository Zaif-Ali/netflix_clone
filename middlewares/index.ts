import { NextRequest, NextResponse } from "next/server";
import { LoginInputschema, RegisterInputschema } from "../lib/validation/valSchema";
import { verifyJwtToken } from "@/lib";


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
  // Get token to check its verify or not
  const { cookies } = request;
  const { value: token } = cookies.get("user-token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  
  if (hasVerifiedToken) {
    // If the token is verify
    return NextResponse.json({ message: "Already login" }, { status: 200 })
  }
  // if the token is not verify 
  const response = NextResponse.next()
  response.cookies.delete("token");
  response.cookies.set('region', 'pk')
  return response
}


