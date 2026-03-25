import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only redirect on root path
  if (pathname !== '/') return NextResponse.next()

  const userAgent = request.headers.get('user-agent') || ''

  // Detect mobile by User-Agent
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  const url = request.nextUrl.clone()
  url.pathname = isMobile ? '/sp/home' : '/pc'

  return NextResponse.redirect(url)
}

export const config = {
  matcher: '/',
}
