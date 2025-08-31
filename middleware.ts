import { NextResponse, type NextRequest } from 'next/server'
import crypto from 'node:crypto'

function makeToken(secret: string) {
  return crypto.createHmac('sha256', secret).update('admin').digest('hex')
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) return NextResponse.next()

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    // If no password configured, allow in dev but warn
    if (process.env.NODE_ENV !== 'production') return NextResponse.next()
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const cookie = req.cookies.get('admin_auth')?.value
  if (cookie && cookie === makeToken(expected)) return NextResponse.next()

  const url = new URL('/admin/login', req.url)
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*']
}
