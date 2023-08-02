import { NextRequest, NextResponse } from "next/server";
import { LoginInputschema, RegisterInputschema } from "../lib/validation/valSchema";
import { isProfileVerified, isVerified } from "@/lib";


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
  // Check the user and user profile verifyed 
  const user = await isVerified(request)
  const profile = await isProfileVerified(request)
  const movies = new URL('/movies', request.url);
  // if the user is verifyed but profile we do nothing
  if (user && !profile) {
    return;
  }
  // if the user and profile both are veriyed we redirect to the movies page
  else if (user && profile) {
    return NextResponse.redirect(movies);
  }
  // if the both are not veriyed we redirect to the auth page
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


export async function moviePagehMiddleware(request: NextRequest) {
  // Check the user and user profile verifyed 
  const user = await isVerified(request)
  const profile = await isProfileVerified(request)
  const browse = new URL('/browse', request.url);
  // if the both are verifyed we do nothing 
  if (user && profile) {
    return;
  }
  // but if only user verifyed we go through browse page
  else if (user) {
    return NextResponse.redirect(browse);
  } 
  // if the both are not veriyed we redirect to the auth page
  const auth = new URL('/auth', request.url);
  return NextResponse.redirect(auth)

}
