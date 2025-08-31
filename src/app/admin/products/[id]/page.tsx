import { prisma } from '../../../../lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface Props { params: { id: string }, searchParams?: { created?: string } }

async function updateProduct(id: string, formData: FormData) {
  'use server'
  const title = String(formData.get('title') || '').trim()
  const slug = String(formData.get('slug') || '').trim()
  const price = BigInt(Math.round(parseFloat(String(formData.get('price') || '0')) * 100))
  const currency = String(formData.get('currency') || 'INR')
  const description = String(formData.get('description') || '')
  const status = String(formData.get('status') || 'DRAFT') as 'DRAFT' | 'PUBLISHED'

  await prisma.product.update({
    where: { id },
    data: { title, slug, price: price as any, currency, description, status }
  })

  redirect('/admin/products')
}

async function destroyProduct(id: string) {
  'use server'
  await prisma.$transaction([
    prisma.image.deleteMany({ where: { productId: id } }),
    prisma.variant.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ])
  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export default async function EditProductPage({ params, searchParams }: Props) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return notFound()

  return (
  <div className="p-6 max-w-3xl">
      {searchParams?.created && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 text-green-800 px-4 py-3">
          Product created. You can continue editing and publish when ready.
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <form action={async () => { 'use server'; await destroyProduct(product.id) }}>
          <button type="submit" className="text-red-600 hover:underline">Delete</button>
        </form>
      </div>
      <form action={updateProduct.bind(null, product.id)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" defaultValue={product.title} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input name="slug" defaultValue={product.slug} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" type="number" step="0.01" defaultValue={(Number(product.price)/100).toString()} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <input name="currency" defaultValue={product.currency} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" rows={4} defaultValue={product.description || ''} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select name="status" defaultValue={product.status} className="mt-1 w-full border border-black/10 rounded-md p-2 bg-white">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <button type="submit" className="bg-gold text-black px-4 py-2 rounded-md">Save</button>
      </form>
    </div>
  )
}
