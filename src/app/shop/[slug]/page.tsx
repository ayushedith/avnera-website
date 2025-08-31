import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '../../../lib/prisma'
import dynamic from 'next/dynamic'

interface Props { params: { slug: string } }

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: 'asc' } }, variants: true }
  })

  if (!product || product.status !== 'PUBLISHED') return notFound()

  return (
    <main className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-3">
        {/* Gallery */}
        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
          {product.images[0] && (
            <Image src={product.images[0].url} alt={product.images[0].alt || product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1).map(img => (
            <div key={img.id} className="relative aspect-square overflow-hidden rounded">
              <Image src={img.url} alt={img.alt || product.title} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 12vw" />
            </div>
          ))}
        </div>
      </div>
      <div>
  <h1 className="text-3xl font-serif text-ink">{product.title}</h1>
  <div className="mt-2 text-xl">{(Number(product.price)/100).toLocaleString('en-IN', { style: 'currency', currency: product.currency })}</div>
  <p className="mt-4 text-slate-700 whitespace-pre-line">{product.description}</p>
        <div className="mt-6 flex gap-3">
          {/* Client island for Add to Bag */}
          <AddToCart id={product.id} slug={product.slug} title={product.title} price={Number(product.price)} currency={product.currency} image={product.images[0]?.url} />
          <button className="btn-outline">Book an Appointment</button>
        </div>
      </div>
    </main>
  )
}

const AddToCart = dynamic(() => import('../../../components/cart/AddButton'), { ssr: false })
