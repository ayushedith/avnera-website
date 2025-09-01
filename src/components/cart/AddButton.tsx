"use client"
import { useCart } from './CartContext'

export default function AddButton({ id, slug, title, price, currency, image }: { id: string, slug: string, title: string, price: number, currency: string, image?: string }) {
  const { addItem } = useCart()
  return (
    <button className="bg-gold text-black px-5 py-3 rounded-md" onClick={() => addItem({ id, slug, title, price, currency, image }, 1)}>
  Add to Cart
    </button>
  )
}
