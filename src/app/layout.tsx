import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '../components/cart/CartContext'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import AnnouncementBar from '../components/AnnouncementBar'
import Footer from '../components/Footer'

const CartDrawer = dynamic(() => import('../components/cart/CartDrawer'), { ssr: false })

export const metadata: Metadata = {
  title: 'AVNERA — Craft Meets Couture',
  description: 'Heritage handcrafted fashion. Modern luxury from India. Worldwide shipping.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
