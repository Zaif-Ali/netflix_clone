import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authmiddleware, logmiddleware, regmiddleware , browseMiddleware} from './middlewares';



const middlewaresMatcher = [
  {
    matcher: '/auth',
    handler: authmiddleware,
  },
  {
    matcher: '/api/auth/register',
    handler: regmiddleware,
  },
  {
    matcher: '/api/auth/login',
    handler: logmiddleware,
  },

  {
    matcher: '/browse',
    handler: browseMiddleware,
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
