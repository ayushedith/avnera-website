import Link from 'next/link'
import { redirect } from 'next/navigation'
import { clearSessionCookie } from '../../lib/auth'

async function logout() {
  'use server'
  clearSessionCookie()
  redirect('/')
}

export default function AdminHome() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <form action={logout}><button className="text-sm underline">Logout</button></form>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/products" className="border border-black/10 rounded-lg p-4 bg-white hover:shadow">Manage Products</Link>
      </div>
    </div>
  )
}
