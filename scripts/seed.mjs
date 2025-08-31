import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.product.findUnique({ where: { slug: 'golden-thread-wrap' } })
  if (existing) {
    console.log('Sample product already exists.')
    return
  }

  // Create Collections
  const couture = await prisma.collection.upsert({
    where: { slug: 'couture' },
    update: {},
    create: {
      title: 'Couture',
      slug: 'couture',
      description: 'Runway-inspired, hand-finished couture pieces.',
      heroImage: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop'
    }
  })
  const heritage = await prisma.collection.upsert({
    where: { slug: 'heritage' },
    update: {},
    create: {
      title: 'Heritage',
      slug: 'heritage',
      description: 'Craft rooted in culture and time-honored techniques.',
      heroImage: 'https://plus.unsplash.com/premium_photo-1721861984077-84991010902f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhlcml0YWdlfGVufDB8fDB8fHww'
    }
  })

  await prisma.product.create({
    data: {
      title: 'Golden Thread Wrap',
      slug: 'golden-thread-wrap',
      description: 'Hand-embroidered wrap in premium silk with gold accents. Luxury woven in every thread.',
  price: 2499900n,
      currency: 'INR',
      status: 'PUBLISHED',
      collectionId: heritage.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop', order: 0 },
          { url: 'https://images.unsplash.com/photo-1545060894-3a5e89c41b93?q=80&w=1200&auto=format&fit=crop', order: 1 },
        ]
      }
    }
  })
  await prisma.product.upsert({
    where: { slug: 'noir-velvet-gown' },
    update: {},
    create: {
      title: 'Noir Velvet Gown',
      slug: 'noir-velvet-gown',
      description: 'Floor-length velvet gown with hand beading.',
  price: 4899900n,
      currency: 'INR',
      status: 'PUBLISHED',
      collectionId: couture.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', order: 0 },
          { url: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop', order: 1 },
        ]
      }
    }
  })
  await prisma.product.upsert({
    where: { slug: 'ivory-silk-saree' },
    update: {},
    create: {
      title: 'Ivory Silk Saree',
      slug: 'ivory-silk-saree',
      description: 'Pure silk saree with zari border.',
  price: 1599900n,
      currency: 'INR',
      status: 'PUBLISHED',
      collectionId: heritage.id,
      images: {
        create: [
          { url: 'https://plus.unsplash.com/premium_photo-1669977749819-d8737b4408f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2lsayUyMHNhcmVlfGVufDB8fDB8fHww', order: 0 },
          { url: 'https://plus.unsplash.com/premium_photo-1669977749819-d8737b4408f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2lsayUyMHNhcmVlfGVufDB8fDB8fHww', order: 1 },
        ]
      }
    }
  })
  console.log('Seeded sample product.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
