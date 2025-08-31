import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="container py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-serif text-lg">AVNERA</div>
          <p className="text-ink/70 mt-2">Craft Meets Couture. Heritage handcrafted in India.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Shop</div>
          <ul className="space-y-1 text-ink/70">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/collections">Collections</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">About</div>
          <ul className="space-y-1 text-ink/70">
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Social</div>
          <ul className="space-y-1 text-ink/70">
            <li><a href="https://instagram.com/avnera.official" target="_blank">@avnera.official</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10 py-4 text-xs text-ink/60">
        <div className="container flex items-center justify-between">
          <span>© {new Date().getFullYear()} AVNERA</span>
          <span>India · Worldwide Shipping</span>
        </div>
      </div>
    </footer>
  )
}
