import { prisma } from '../../../../lib/prisma'
import { redirect } from 'next/navigation'

async function createProduct(formData: FormData) {
  'use server'
  const title = String(formData.get('title') || '').trim()
  const slug = String(formData.get('slug') || '').trim()
  const priceInput = String(formData.get('price') || '0')
  const price = BigInt(Math.round(parseFloat(priceInput) * 100))
  const currency = String(formData.get('currency') || 'INR')
  const description = String(formData.get('description') || '')
  const imageUrls = String(formData.get('images') || '').split('\n').map(s => s.trim()).filter(Boolean)

  if (!title || !slug || !price) {
    throw new Error('Title, slug and price are required')
  }

  const product = await prisma.product.create({
    data: {
      title,
      slug,
      // Prisma BigInt maps to JS bigint; cast to any to satisfy TS when schema recently changed
      price: price as any,
      currency,
      description,
      images: { create: imageUrls.map((url, i) => ({ url, order: i })) }
    }
  })

  redirect(`/admin/products/${product.id}?created=1`)
}

export default function NewProductPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
      <form action={createProduct} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input name="slug" className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Price (e.g., 14999.00)</label>
            <input name="price" type="number" step="0.01" className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <input name="currency" defaultValue="INR" className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" rows={4} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URLs (one per line)</label>
          <textarea name="images" rows={4} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" placeholder="https://...\nhttps://..." />
        </div>
        <button type="submit" className="bg-gold text-black px-4 py-2 rounded-md">Create</button>
      </form>
    </div>
  )
}
