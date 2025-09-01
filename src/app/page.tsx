import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '../components/HeroCarousel'
import PromoCard from '../components/PromoCard'
import { prisma } from '../lib/prisma'

function formatPrice(paise: number | bigint, currency = 'INR') {
  const rupees = (Number(paise) || 0) / 100
  return rupees.toLocaleString('en-IN', { style: 'currency', currency })
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch featured collections and latest products; gracefully handle empty states
  let collections: Array<{ id: string; slug: string; title: string; description: string | null; heroImage: string | null }> = []
  let products: Array<{ id: string; slug: string; title: string; currency: string; price: bigint | number; images: Array<{ url: string; alt: string | null }> }> = []

  try {
    ;[collections, products] = await Promise.all([
      prisma.collection.findMany({
        take: 3,
        orderBy: { title: 'asc' },
      }),
      prisma.product.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { images: { take: 1, orderBy: { order: 'asc' } } },
      }),
    ])
  } catch (err) {
    console.error('Database not initialized yet or unavailable. Rendering with empty state.', err)
  }

  return (
    <main className="min-h-screen flex flex-col items-stretch text-ink overflow-hidden">
      {/* Hero */}
      <HeroCarousel
        slides={[
          {
            title: 'Indo Western',
            subtitle: 'Curated silhouettes to elevate your wardrobe',
            badge: 'SPECIAL PRICE',
            cta: { label: 'Shop Now', href: '/collections/indo-western' },
            leftImage: {
              url: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop',
              alt: 'Indo Western left',
            },
            rightImage: {
              url: 'https://images.unsplash.com/photo-1592878904946-b3cd00e68e91?q=80&w=1200&auto=format&fit=crop',
              alt: 'Indo Western right',
            },
          },
          {
            title: 'Luxe Collection',
            subtitle: 'Hand-beaded couture crafted in limited runs',
            badge: 'NEW ARRIVALS',
            cta: { label: 'Explore', href: '/collections/luxe-collection' },
            leftImage: {
              url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
            },
            rightImage: {
              url: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop',
            },
          },
        ]}
      />

      {/* Promo Cards */}
      <section className="container py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PromoCard
            title="Festive Fabulous"
            subtitle="Vibrant sets that shine for every celebration"
            href="/collections/festive"
            image={{
              url: 'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?q=80&w=1200&auto=format&fit=crop',
              alt: 'Festive outfits',
            }}
          />
          <PromoCard
            title="Best Sellers"
            subtitle="Loved by the community — back in stock"
            href="/collections/best-sellers"
            image={{
              url: 'https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1200&auto=format&fit=crop',
              alt: 'Best sellers',
            }}
          />
        </div>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="container py-12 md:py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif">Featured Collections</h2>
            <Link href="/collections" className="text-ink/60 hover:text-ink">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} className="group rounded-xl overflow-hidden border border-ink/10 bg-white shadow-luxury">
                <div className="relative aspect-[16/10] bg-[rgba(10,10,10,0.04)] overflow-hidden">
                  {c.heroImage ? (
                    <Image src={c.heroImage} alt={c.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-ink/40">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{c.title}</h3>
                  {c.description && <p className="text-sm text-ink/60 mt-1 line-clamp-2">{c.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {products.length > 0 && (
        <section className="container py-12 md:py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif">New Arrivals</h2>
            <Link href="/shop" className="text-ink/60 hover:text-ink">Shop all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => {
              const img = p.images?.[0]
              return (
                <Link key={p.id} href={`/shop/${p.slug}`} className="group rounded-xl overflow-hidden border border-ink/10 bg-white">
                  <div className="relative aspect-[4/5] bg-[rgba(10,10,10,0.04)] overflow-hidden">
                    {img ? (
                      <Image src={img.url} alt={img.alt ?? p.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-300" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-ink/40">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm md:text-base font-medium line-clamp-1">{p.title}</h3>
                    <p className="text-ink/70 text-sm">{formatPrice(p.price, p.currency)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Brand story */}
      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif mb-3">Timeless craft, modern silhouette</h2>
            <p className="text-ink/70 leading-relaxed">
              Each AVNERA piece is conceived in our studio and finished by hand with meticulous attention
              to detail. We balance heritage techniques with contemporary design to create effortless
              luxury for every day and the extraordinary.
            </p>
            <div className="mt-5 flex gap-3">
              <Link href="/about" className="btn-outline">Our Story</Link>
              <Link href="/contact" className="btn-gold">Contact</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 rounded-2xl border border-ink/10 bg-white aspect-[16/10] md:aspect-[4/3] overflow-hidden shadow-luxury">
            <div className="w-full h-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(198,169,105,0.25),transparent_60%)]" />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white/60 border-t border-b border-ink/10">
        <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
          <div>
            <div className="font-medium">Free Shipping</div>
            <div className="text-ink/60">On orders over ₹2,999</div>
          </div>
          <div>
            <div className="font-medium">Easy Returns</div>
            <div className="text-ink/60">14-day hassle-free</div>
          </div>
          <div>
            <div className="font-medium">Secure Checkout</div>
            <div className="text-ink/60">256-bit encryption</div>
          </div>
          <div>
            <div className="font-medium">Handcrafted</div>
            <div className="text-ink/60">Made with care</div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-12 md:py-16">
        <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-10 text-center">
          <h3 className="text-2xl font-serif mb-2">Join the AVNERA circle</h3>
          <p className="text-ink/70 mb-5">Be first to know about new drops, private events, and editor picks.</p>
          <form className="mx-auto flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 border border-ink/15 rounded-xl px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[rgba(198,169,105,0.35)]"
              aria-label="Email address"
            />
            <button type="button" className="btn-gold">Subscribe</button>
          </form>
          <p className="text-ink/50 text-xs mt-3">By subscribing, you agree to receive emails from AVNERA. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  )
}
