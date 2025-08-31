import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../../../lib/prisma'

interface Props { params: { slug: string } }

export default async function CollectionDetailPage({ params }: Props) {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
    include: { products: { where: { status: 'PUBLISHED' }, include: { images: true } } }
  })
  if (!collection) return notFound()
  return (
    <main className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-ink">{collection.title}</h1>
        {collection.description && (<p className="text-ink/70 mt-2 max-w-2xl">{collection.description}</p>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.products.map(p => (
          <Link key={p.id} href={`/shop/${p.slug}`} className="group block">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
              {p.images[0] && (
                <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
              )}
            </div>
            <div className="mt-3">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-600">{(Number(p.price)/100).toLocaleString('en-IN', { style: 'currency', currency: p.currency })}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
