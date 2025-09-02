import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'session'

type SessionPayload = {
  id: string
  email: string
  role: 'USER' | 'ADMIN'
  iat: number
}

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function unbase64url(input: string) {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = input.length % 4
  if (pad) input += '='.repeat(4 - pad)
  return Buffer.from(input, 'base64').toString('utf8')
}

function getSecret() {
  const secret = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('Missing AUTH_SECRET or ADMIN_PASSWORD')
  return secret
}

export function signSession(payload: Omit<SessionPayload, 'iat'>) {
  const data: SessionPayload = { ...payload, iat: Date.now() }
  const json = JSON.stringify(data)
  const body = base64url(json)
  const sig = crypto.createHmac('sha256', getSecret()).update(body).digest()
  const token = body + '.' + base64url(sig)
  return token
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const [body, sig] = token.split('.')
    if (!body || !sig) return null
    const expected = base64url(crypto.createHmac('sha256', getSecret()).update(body).digest())
    if (sig !== expected) return null
    const json = unbase64url(body)
    const payload = JSON.parse(json) as SessionPayload
    return payload
  } catch {
    return null
  }
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 })
  // also clear legacy admin cookie if present
  cookies().set('admin_auth', '', { path: '/', maxAge: 0 })
}

export function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export function isAdmin() {
  const user = getCurrentUser()
  return user?.role === 'ADMIN'
}
