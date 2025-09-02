import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'

async function promote(formData: FormData) {
  'use server'
  const email = String(formData.get('email') || '').toLowerCase().trim()
  if (!email) return
  const db = prisma as any
  // Use updateMany to avoid throwing when the user doesn't exist
  await db.user.updateMany({ where: { email }, data: { role: 'ADMIN' } })
  redirect('/admin')
}

export default async function AdminUsersPage() {
  const db = prisma as any
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <form action={promote} className="mb-6 flex gap-2">
        <input name="email" placeholder="user@example.com" className="border border-black/10 rounded-md p-2" />
        <button className="bg-gold text-black px-3 rounded-md">Promote to Admin</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2 pr-4">{u.role}</td>
                <td className="py-2 pr-4">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
