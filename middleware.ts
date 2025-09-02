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

  // Also allow via signed session cookie when role is ADMIN
  const session = req.cookies.get('session')?.value
  if (session) {
    try {
      const [body, sig] = session.split('.')
      if (body && sig) {
        const secret = process.env.AUTH_SECRET || expected
        const expectedSig = crypto.createHmac('sha256', secret).update(body).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
        if (sig === expectedSig) {
          const json = Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
          const payload = JSON.parse(json)
          if (payload?.role === 'ADMIN') return NextResponse.next()
        }
      }
    } catch {}
  }

  const url = new URL('/admin/login', req.url)
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*']
}
