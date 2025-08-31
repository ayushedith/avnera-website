import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../../lib/prisma'

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({ orderBy: { title: 'asc' } })
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-serif text-ink mb-6">Collections</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collections.map(c => (
          <Link key={c.id} href={`/collections/${c.slug}`} className="group block rounded-2xl overflow-hidden border border-black/10 bg-white">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src={c.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'} alt={c.title} fill className="object-cover transition-transform group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <div className="font-medium">{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
