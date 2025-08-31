export default function ContactPage() {
  return (
    <main className="container py-12">
  <h1 className="text-3xl font-serif text-ink mb-6">Contact</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-ink/80">We’d love to hear from you. For bespoke orders, collaborations, or press, drop us a note.</p>
          <div className="text-sm text-ink/60">
            <div>📍 India — Worldwide Shipping</div>
            <div>Instagram: @avnera.official</div>
            <div>Email: hello@avnera.com</div>
          </div>
        </div>
        <form className="space-y-4 bg-white border border-black/10 rounded-2xl p-6">
          <input placeholder="Name" className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          <input placeholder="Email" className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          <textarea placeholder="Message" rows={5} className="w-full rounded-md bg-white border border-black/10 px-3 py-2 outline-none focus:border-gold" />
          <button className="btn-gold" type="button">Send</button>
        </form>
      </div>
    </main>
  )
}
