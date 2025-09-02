import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../../../lib/prisma'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let products: Array<{ id: string; title: string; currency: string; price: bigint | number; slug: string; images: Array<{ url: string; alt: string | null }>; variants: Array<any> }> = []
  let hadDbError = false
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { images: true, variants: true }
    })
  } catch (err) {
    hadDbError = true
    console.error('Database not initialized yet or unavailable. Rendering Admin Products with empty state.', err)
  }

  async function deleteProduct(formData: FormData) {
    'use server'
    const id = String(formData.get('id') || '')
    if (!id) return
    await prisma.$transaction([
      prisma.image.deleteMany({ where: { productId: id } }),
      prisma.variant.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ])
    revalidatePath('/admin/products')
  }

  return (
  <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="text-sm underline">Users</Link>
          <Link href="/admin/products/new" className="bg-gold text-black px-4 py-2 rounded-md">New Product</Link>
        </div>
      </div>
      {hadDbError && (
        <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800">
          Database tables are missing. Run migrations and seed the DB to get started.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="border border-black/10 rounded-lg p-4 bg-white">
            {p.images[0] && (
              <div className="relative w-full h-48 overflow-hidden rounded">
                <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            )}
            <div className="mt-3">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-600">{p.currency} {(Number(p.price)/100).toFixed(2)}</div>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <Link href={`/admin/products/${p.id}`} className="text-blue-600">Edit</Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="text-red-600 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-slate-500">
            No products yet. Run DB migrations and seed data to get started.
          </div>
        )}
      </div>
    </div>
  )
}
