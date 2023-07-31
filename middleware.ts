import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logmiddleware, regmiddleware } from './middlewares';



const middlewaresMatcher = [
  {
    matcher: '/api/auth/register',
    handler: regmiddleware,
  },
  {
    matcher: '/api/auth/login',
    handler: logmiddleware,
  },

]

export default function middlewareHandler(request: NextRequest) {
  for (const mw of middlewaresMatcher) {
    if (request.nextUrl.pathname.match(mw.matcher)) {
      return mw.handler(request);
    }
  }
  return NextResponse.next();
}
