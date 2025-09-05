import Link from 'next/link'

const ITEMS = [...Array(6)].map((_, i) => ({ id: i + 1, title: `Winter Wear ${i + 1}`, price: 1999 + i * 300 }))

export default function WinterWearPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-serif text-ink mb-6">Winter Wear</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ITEMS.map(p => (
          <Link key={p.id} href="#" className="block rounded-2xl overflow-hidden border border-black/10 bg-white p-4">
            <div className="h-44 mb-3 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop')] bg-cover rounded" />
            <div className="font-medium">{p.title}</div>
            <div className="text-ink/70">₹{p.price}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
