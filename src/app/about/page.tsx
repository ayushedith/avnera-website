export default function AboutPage() {
  return (
  <main className="container py-12 space-y-10">
      <section className="text-center max-w-3xl mx-auto">
  <h1 className="text-4xl md:text-5xl font-serif text-ink tracking-wide">AVNERA</h1>
  <p className="mt-4 text-lg text-ink/70">
          Craft Meets Couture. AVNERA blends heritage handcraft from India with modern silhouettes—designed for a global wardrobe.
        </p>
      </section>
      <section className="space-y-6">
        <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">The Name</h3>
          <p className="text-sm text-ink/70">Avnera is a fusion of Akanksha + Neera—our lineage and legacy woven together. Each collection explores a conversation between craft and modern dressing, rooted in timeless techniques.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-black/10 bg-white">
            <h3 className="font-serif text-xl mb-2">Craft & Artisans</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop" alt="Artisan at work" className="rounded-lg mb-3 aspect-[4/3] object-cover" />
            <p className="text-sm text-ink/70">We partner with master artisans across India—hand-embroiders, weavers and finishers—ensuring skills are preserved and fairly compensated. Our pieces are made in small batches, allowing meticulous attention to detail.</p>
          </div>

          <div className="p-6 rounded-2xl border border-black/10 bg-white">
            <h3 className="font-serif text-xl mb-2">Sustainability</h3>
            <p className="text-sm text-ink/70">Material integrity is central: we source responsibly, prefer natural fibres, and minimize waste through considered patterning. Where possible, deadstock and low-impact dyes are used. AVNERA aims for enduring wardrobe pieces rather than fast fashion.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">The Studio</h3>
          <p className="text-sm text-ink/70">Our studio blends design, development, and craft direction. Sketches are realized with artisan partners; prototypes undergo hands-on refinement before release.</p>
        </div>

        <div className="p-6 rounded-2xl border border-black/10 bg-white">
          <h3 className="font-serif text-xl mb-2">Team</h3>
          <p className="text-sm text-ink/70">Our studio combines design direction, craft stewardship and production expertise. The team works closely with artisan partners to develop collections from concept to finished piece — design research, prototyping, fit and finish, and quality control. We prioritise long-term artisan relationships, skill development, and thoughtful production practices so every garment reflects care at every stage.</p>
        </div>
      </section>
    </main>
  )
}
