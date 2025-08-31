"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from './cart/CartContext'

export default function Navbar() {
  const { open, items } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button aria-label="Menu" className="md:hidden p-2 border border-black/10 rounded-md" onClick={() => setMenuOpen(v => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <Link href="/" className="text-ink font-serif text-xl tracking-widest"><span className="text-gold">AV</span>NERA</Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-ink/80">
          <Link href="/shop" className="hover:text-gold">Shop</Link>
          <Link href="/collections" className="hover:text-gold">Collections</Link>
          <Link href="/about" className="hover:text-gold">About</Link>
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={open} className="relative border border-black/10 rounded-md px-3 py-1" aria-label="Open cart">
            Bag
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-xs rounded-full px-1.5 py-0.5">{count}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-b border-black/10 bg-white">
          <div className="container py-3 flex flex-col gap-3 text-ink/90">
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/collections" onClick={() => setMenuOpen(false)}>Collections</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
