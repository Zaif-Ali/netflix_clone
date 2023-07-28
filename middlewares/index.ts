import { NextRequest, NextResponse } from "next/server";
import { Inputschema } from "./c";




export async function regmiddleware(request: NextRequest) {
  try {
    let InputData = await request.json();
    InputData = await Inputschema.validate(InputData, { strict: true, abortEarly: false })
  } catch (error : any) {
    return NextResponse.json(error)
  }
  const response = NextResponse.next()

  response.cookies.set('region', 'pk')
  return response
}