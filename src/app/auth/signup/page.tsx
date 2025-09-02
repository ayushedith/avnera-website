import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { signSession, setSessionCookie } from '../../../lib/auth'
import bcrypt from 'bcryptjs'

function toQS(params: Record<string, string>) {
  const u = new URL('http://local')
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v))
  return u.search
}

async function signup(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').toLowerCase().trim()
  const password = String(formData.get('password') || '')
  if (!email || !password) return redirect('/auth/signup' + toQS({ error: 'Email and password required' }))
  try {
    const db = prisma as any
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) return redirect('/auth/signup' + toQS({ error: 'Email already in use' }))

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await db.user.create({ data: { name, email, passwordHash, role: 'USER' } })

    const token = signSession({ id: user.id, email: user.email, role: user.role as 'USER' | 'ADMIN' })
    setSessionCookie(token)
    redirect('/')
  } catch (e) {
    redirect('/auth/signup' + toQS({ error: 'Unexpected error. Try again.' }))
  }
}

export default function SignupPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <main className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,169,105,0.12),transparent)]">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-luxury">
        <h1 className="text-2xl font-serif text-ink mb-4 tracking-wide">Create Account</h1>
        {searchParams?.error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">{searchParams.error}</div>
        )}
        <form action={signup} className="space-y-4">
          <div>
            <label className="block text-sm text-ink/70 mb-1">Name</label>
            <input name="name" className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm text-ink/70 mb-1">Email</label>
            <input type="email" name="email" required className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm text-ink/70 mb-1">Password</label>
            <input type="password" name="password" required className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          </div>
          <button type="submit" className="w-full bg-gold text-black py-2.5 rounded-md font-medium hover:opacity-90 transition">Sign up</button>
        </form>
      </div>
    </main>
  )
}
