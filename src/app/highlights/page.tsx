import Link from 'next/link'

const DUMMY = [...Array(6)].map((_, i) => ({ id: i + 1, title: `Bestseller Item ${i + 1}`, price: (999 + i * 250) }))

export default function HighlightsPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-serif text-ink mb-6">Best Sellers</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {DUMMY.map(p => (
          <Link key={p.id} href="#" className="block rounded-2xl overflow-hidden border border-black/10 bg-white p-4">
            <div className="h-48 mb-3 bg-[url('https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1200&auto=format&fit=crop')] bg-cover rounded" />
            <div className="font-medium">{p.title}</div>
            <div className="text-ink/70">₹{p.price}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
