export default function AboutPage() {
  return (
  <main className="container py-12 space-y-10">
      <section className="text-center max-w-3xl mx-auto">
  <h1 className="text-4xl md:text-5xl font-serif text-ink tracking-wide">AVNERA</h1>
  <p className="mt-4 text-lg text-ink/70">
          Craft Meets Couture. AVNERA blends heritage handcraft from India with modern silhouettes—designed for a global wardrobe.
        </p>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">The Name</h3>
          <p className="text-sm text-ink/70">Avnera is a fusion of Akanksha + Neera—our lineage and legacy woven together.</p>
  </div>
  <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">Craft</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop" alt="Artisan at work" className="rounded-lg mb-3 aspect-[4/3] object-cover" />
          <p className="text-sm text-ink/70">Hand embroidery, fine finishing, and time-honored techniques from master artisans.</p>
  </div>
  <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">Ethos</h3>
          <p className="text-sm text-ink/70">Small-batch production, mindful sourcing, and pieces designed to be treasured.</p>
        </div>
      </section>
    </main>
  )
}
