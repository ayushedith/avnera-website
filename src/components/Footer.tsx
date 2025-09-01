"use client"

import React from 'react'
import Link from 'next/link'

function Icon({ name, className }: { name: 'map'|'phone'|'mail'|'clock'|'facebook'|'instagram'|'arrowUp'; className?: string }) {
  const common = `w-5 h-5 ${className ?? ''}`
  switch (name) {
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5 2V6l5-2 6 2 5-2v16l-5 2-6-2z"/>
          <circle cx="12" cy="10" r="2" strokeWidth="1.5"/>
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V21a1 1 0 01-1.09 1c-9.94-1.11-17.8-9-18.91-18.91A1 1 0 013 2h4.09A1 1 0 018.1 2.91l1.2 3a1 1 0 01-.27 1.09L7.91 8.09a16 16 0 008 8l1.09-1.12a1 1 0 011.09-.27l3 1.2A1 1 0 0122 16.92z"/>
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 8l-10 6L2 8"/>
        </svg>
      )
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
          <path strokeWidth="1.5" strokeLinecap="round" d="M12 7v5l3 3"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.6V12h2.8V9.7c0-2.8 1.6-4.3 4.1-4.3 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V12h3l-.5 2.9h-2.5v7A10 10 0 0022 12z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3.5" strokeWidth="1.5"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      )
    case 'arrowUp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6"/>
        </svg>
      )
  }
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-black/10 bg-rose-50/80 relative text-ink">
  {/* Top grid (desktop) */}
  <div className="container py-12 hidden md:grid gap-10 md:grid-cols-5 text-sm">
        {/* Brand + contact */}
        <div className="space-y-4">
          <div>
            <div className="font-serif text-2xl tracking-wide">AVNERA</div>
            <p className="text-ink/70 mt-2 max-w-xs">Craft Meets Couture. Heritage handcrafted in India.</p>
          </div>
          <ul className="space-y-3 text-ink/80">
            <li className="flex items-start gap-3"><Icon name="map"/><span>F-121, Rajouri Garden, New Delhi 110027</span></li>
            <li className="flex items-center gap-3"><Icon name="phone"/><span>Toll Free: +91-8882404526</span></li>
            <li className="flex items-center gap-3"><Icon name="mail"/><span>support@avnera.com</span></li>
            <li className="flex items-center gap-3"><Icon name="clock"/><span>11 AM – 9 PM (Open All Days)</span></li>
          </ul>

          <div className="flex items-center gap-3 pt-2">
            <a aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink hover:bg-white transition">
              <Icon name="facebook" className="w-4 h-4"/>
            </a>
            <a aria-label="Instagram" href="https://instagram.com/avnera.official" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink hover:bg-white transition">
              <Icon name="instagram" className="w-4 h-4"/>
            </a>
          </div>
        </div>

        {/* Our Shop */}
        <div>
          <div className="font-medium mb-3 tracking-wide font-nav">OUR SHOP</div>
          <ul className="space-y-2 text-ink/80">
            <li><Link href="/collection">New Arrivals</Link></li>
            <li><Link href="/collection">Collections</Link></li>
            <li><Link href="/highlights">Highlights</Link></li>
            <li><Link href="/collection">Sale</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <div className="font-medium mb-3 tracking-wide font-nav">ABOUT US</div>
          <ul className="space-y-2 text-ink/80">
            <li><Link href="/about">About Store</Link></li>
            <li><Link href="/contact">Store Location</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <div className="font-medium mb-3 tracking-wide font-nav">INFORMATION</div>
          <ul className="space-y-2 text-ink/80">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Exchange &amp; Cancellation</a></li>
          </ul>
        </div>

        {/* Discover */}
        <div>
          <div className="font-medium mb-3 tracking-wide font-nav">DISCOVER</div>
          <ul className="space-y-2 text-ink/80">
            <li><a href="#">Collaborate With Us</a></li>
            <li><a href="#">Exchange Request</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><Link href="/auth/login">Your Account</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="container md:hidden text-sm">
        {/* Collapsible lists */}
  <Accordion title="OUR SHOP">
          <ul className="space-y-2 text-ink/80 py-3">
            <li><Link href="/collection">New Arrivals</Link></li>
            <li><Link href="/collection">Collections</Link></li>
            <li><Link href="/highlights">Highlights</Link></li>
            <li><Link href="/collection">Sale</Link></li>
          </ul>
        </Accordion>
  <Accordion title="ABOUT US">
          <ul className="space-y-2 text-ink/80 py-3">
            <li><Link href="/about">About Store</Link></li>
            <li><Link href="/contact">Store Location</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </Accordion>
  <Accordion title="INFORMATION">
          <ul className="space-y-2 text-ink/80 py-3">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Exchange &amp; Cancellation</a></li>
          </ul>
        </Accordion>
  <Accordion title="DISCOVER" last>
          <ul className="space-y-2 text-ink/80 py-3">
            <li><a href="#">Collaborate With Us</a></li>
            <li><a href="#">Exchange Request</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><Link href="/auth/login">Your Account</Link></li>
          </ul>
        </Accordion>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10 py-5 text-xs text-ink/70 relative">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span>Copyright {year} © AVNERA. All Rights Reserved.</span>
          <div className="flex items-center gap-3">
            {['American Express','Mastercard','VISA','PayPal','Diners'].map((p)=> (
              <span key={p} className="h-7 min-w-[56px] px-2.5 inline-flex items-center justify-center rounded-md bg-white border border-black/10 shadow-sm text-[10px] font-medium text-ink/70">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-6 -top-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-rose-500 text-white shadow-md hover:bg-rose-600 transition"
        >
          <Icon name="arrowUp" className="w-5 h-5"/>
        </button>
      </div>
    </footer>
  )
}

function Accordion({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={"" + (!last ? " border-b border-black/10" : "") + " "}>
      <button
        className="w-full flex items-center justify-between py-4 border-t border-black/10"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="tracking-wide font-medium">{title}</span>
        <span className="text-xl leading-none select-none">{open ? '−' : '+'}</span>
      </button>
      <div className={open ? 'block' : 'hidden'}>
        {children}
      </div>
    </div>
  )
}
