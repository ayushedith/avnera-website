import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../../lib/prisma'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  let products: Array<{ id: string; slug: string; title: string; currency: string; price: bigint | number; images: Array<{ url: string; alt: string | null }> }> = []
  try {
    products = await prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      include: { images: true }
    })
  } catch (err) {
    console.error('Database not initialized yet or unavailable. Rendering Shop with empty state.', err)
  }

  return (
    <main className="container mx-auto px-4 py-10">
  <h1 className="text-3xl font-serif text-ink mb-8">Shop</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <Link key={p.id} href={`/shop/${p.slug}`} className="group block">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
              {p.images[0] && (
                <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
              )}
            </div>
            <div className="mt-3">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-600">
                {(Number(p.price)/100).toLocaleString('en-IN', { style: 'currency', currency: p.currency })}
              </div>
            </div>
          </Link>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-slate-500">
            No products yet. Run DB migrations and seed data to get started.
          </div>
        )}
      </div>
    </main>
  )
}
