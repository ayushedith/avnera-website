"use client"
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQty, total } = useCart()
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={close} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white text-black shadow-xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={close} aria-label="Close">✕</button>
        </div>
        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-160px)]">
          {items.length === 0 && <div className="text-slate-600">Your cart is empty.</div>}
          {items.map(i => (
            <div key={i.id} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image || '/vercel.svg'} alt={i.title} className="w-20 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-slate-600">{i.currency} {(i.price/100).toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-2 border" onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
                  <span>{i.qty}</span>
                  <button className="px-2 border" onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
                  <button className="ml-auto text-red-600" onClick={() => removeItem(i.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="text-slate-600">Subtotal</div>
            <div className="font-semibold">INR {(total/100).toFixed(2)}</div>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md">Checkout</button>
        </div>
      </div>
    </div>
  )
}
