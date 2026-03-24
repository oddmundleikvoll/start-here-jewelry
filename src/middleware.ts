import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Redirect /en and /en/* to corresponding root pages
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const redirectPath = pathname.replace(/^\/en/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = redirectPath
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/en/:path*'],
}
