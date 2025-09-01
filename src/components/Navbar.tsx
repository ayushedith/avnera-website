"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from './cart/CartContext'

export default function Navbar() {
  const { open, items } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)
  const categories = [
    { href: '/collection', label: 'New Arrivals' },
    { href: '/highlights', label: 'Best Sellers' },
    { href: '/collection', label: 'Swimwear' },
    { href: '/collection', label: 'Luxe Collection' },
    { href: '/collection', label: 'Indian Wear' },
    { href: '/collection', label: 'Indo Western' },
    { href: '/collection', label: 'Summer Vibes' },
    { href: '/collection', label: 'Winter Wear' },
  ]

  return (
  <header className={`sticky top-0 ${menuOpen ? 'z-[1100]' : 'z-40'} border-b border-black/10 ${menuOpen ? '' : 'backdrop-blur'} ${menuOpen ? 'bg-white shadow' : 'bg-white/90'}`}>
      {/* Top bar with categories and centered logo */}
  <div className="container h-16 hidden md:grid grid-cols-[40px_minmax(0,1fr)_auto_minmax(0,1fr)_160px] items-center">
        {/* Left: search icon */}
        <button aria-label="Search" className="justify-self-start text-ink/80 hover:text-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
        </button>

        {/* Left categories */}
  <nav className="min-w-0 overflow-x-auto no-scrollbar flex items-center justify-end gap-5 font-nav text-[12px] lg:text-[13px] tracking-wide whitespace-nowrap">
          <NavItem href="/collection" label="NEW" />
          <NavItem href="/highlights" label="BEST SELLERS" muted />
          <NavItem href="/collection" label="SWIMWEAR" />
          <NavItem href="/collection" label="LUXE COLLECTION" />
        </nav>

        {/* Center logo */}
        <Link href="/" className="justify-self-center text-ink font-serif text-xl tracking-widest">
          <span className="text-gold">AV</span>NERA
        </Link>

        {/* Right categories */}
  <nav className="min-w-0 overflow-x-auto no-scrollbar flex items-center justify-start gap-5 font-nav text-[12px] lg:text-[13px] tracking-wide whitespace-nowrap">
          <NavItem href="/collection" label="INDIAN WEAR" />
          <NavItem href="/collection" label="INDO WESTERN" />
          <NavItem href="/collection" label="SUMMER VIBES" />
          <NavItem href="/collection" label="WINTER WEAR" />
        </nav>

        {/* Right icons */}
        <div className="flex items-center justify-end gap-5">
          <button aria-label="Wishlist" className="text-ink/80 hover:text-ink"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.4 5.4 0 00-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 00-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 000-7.6z"/></svg></button>
          <Link href="/auth/login" aria-label="Account" className="text-ink/80 hover:text-ink"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c2.2-3.5 5.3-5.3 8-5.3S17.8 16.5 20 20"/></svg></Link>
          <button
            onClick={() => { setCartPulse(true); open(); setTimeout(() => setCartPulse(false), 520) }}
            aria-label="Open cart"
            className={`relative text-ink/80 hover:text-ink cart-hover-wiggle cart-ripple ${cartPulse ? 'cart-pulse' : ''}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
            {count > 0 && <span className="cart-badge absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] rounded-full px-1.5 py-0.5">{count}</span>}
          </button>
        </div>
      </div>

  {/* Mobile header */}
      <div className="container h-14 flex md:hidden items-center justify-between">
        <button aria-label="Menu" className="p-2 -ml-2" onClick={() => setMenuOpen(v => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <Link href="/" className="text-ink font-serif text-lg tracking-widest"><span className="text-gold">AV</span>NERA</Link>
        <button
          onClick={() => { setCartPulse(true); open(); setTimeout(() => setCartPulse(false), 520) }}
          aria-label="Open cart"
          className={`relative cart-hover-wiggle cart-ripple -mr-2 ${cartPulse ? 'cart-pulse' : ''}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
          {count > 0 && <span className="cart-badge absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] rounded-full px-1.5 py-0.5">{count}</span>}
        </button>
      </div>

      {/* Mobile menu */}
  <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} categories={categories} />
    </header>
  )
}

function NavItem({ href, label, muted }: { href: string; label: string; muted?: boolean }) {
  return (
    <Link href={href} className={(muted ? 'text-rose-400' : 'text-ink') + ' relative group hover:text-rose-500 flex items-center gap-1'}>
      <span className="font-semibold leading-none">{label}</span>
      <span className="text-rose-500 group-hover:text-rose-600 leading-none">▾</span>
    </Link>
  )
}

function MobileDrawer({ open, onClose, categories }: { open: boolean; onClose: () => void; categories: { href: string; label: string }[] }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-[1150] bg-white">
      {/* Overlay */}
           <div
             aria-hidden
             onClick={onClose}
             className="absolute inset-0 bg-white opacity-100"
            />
    {/* Panel */}
  <aside className="absolute inset-y-0 left-0 z-[10] w-[85%] max-w-sm bg-white shadow-2xl border-r border-black/10 animate-slide-in-left">
  <div className="absolute inset-0 bg-white" />
  <div className="relative flex items-center justify-between px-4 h-14 border-b border-black/10">
          <Link href="/" onClick={onClose} className="text-ink font-serif text-lg tracking-widest"><span className="text-gold">AV</span>NERA</Link>
          <button aria-label="Close" onClick={onClose} className="p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

  <nav className="relative px-2 py-2 font-nav text-[15px] text-ink/90 z-10">
          {categories.map(c => (
            <Link key={c.label} href={c.href} onClick={onClose} className="block px-3 py-3 border-b border-black/10">
              {c.label}
            </Link>
          ))}
          <div className="px-3 pt-4 text-xs text-ink/60">More</div>
          <Link href="/about" onClick={onClose} className="block px-3 py-3 border-b border-black/10">About</Link>
          <Link href="/contact" onClick={onClose} className="block px-3 py-3 border-b border-black/10">Contact</Link>
          <Link href="/auth/login" onClick={onClose} className="block px-3 py-3">Sign In</Link>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" />
        </nav>
      </aside>
    </div>
  )
}
