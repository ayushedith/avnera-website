import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'node:crypto'

function toQS(params: Record<string, string>) {
  const u = new URL('http://local')
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v))
  return u.search
}

function makeToken(secret: string) {
  return crypto.createHmac('sha256', secret).update('admin').digest('hex')
}

async function login(formData: FormData) {
  'use server'
  const password = String(formData.get('password') || '')
  const next = String(formData.get('next') || '')
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return redirect('/admin/login' + toQS({ error: 'ADMIN_PASSWORD not set' }))
  if (password !== expected) return redirect('/admin/login' + toQS({ error: 'Invalid credentials' }))

  const token = makeToken(expected)
  cookies().set('admin_auth', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8 // 8 hours
  })
  redirect(next && next.startsWith('/admin') ? next : '/admin/products')
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,169,105,0.15),transparent)]">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-luxury">
        <h1 className="text-2xl font-serif text-ink mb-4 tracking-wide">Admin Access</h1>
        {/* Show error if present */}
        {/* @ts-ignore searchParams is passed by Next.js */}
        {/* eslint-disable-next-line react/prop-types */}
        {/* In a Server Component route, we can accept `searchParams` in signature. Keeping simple here. */}
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm text-ink/70 mb-1">Password</label>
            <input type="password" name="password" className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" required />
          </div>
          {/* Preserve next param when redirected from middleware: kept empty here; middleware appends ?next which server action reads */}
          <input type="hidden" name="next" value="" />
          <button type="submit" className="w-full bg-gold text-black py-2.5 rounded-md font-medium hover:opacity-90 transition">Enter</button>
        </form>
        <p className="text-xs text-ink/60 mt-3">Set ADMIN_PASSWORD in your environment to enable login.</p>
      </div>
    </main>
  )
}
