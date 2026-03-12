import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting production seed...')

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'teknologi' },
      update: {},
      create: {
        name: 'Teknologi',
        slug: 'teknologi',
        description: 'Berita terkini seputar teknologi, gadget, dan inovasi digital',
        color: 'cyan',
        icon: 'Cpu',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bisnis' },
      update: {},
      create: {
        name: 'Bisnis',
        slug: 'bisnis',
        description: 'Kabar ekonomi, investasi, dan perkembangan bisnis terkini',
        color: 'teal',
        icon: 'TrendingUp',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hiburan' },
      update: {},
      create: {
        name: 'Hiburan',
        slug: 'hiburan',
        description: 'Berita selebriti, film, musik, dan dunia entertainment',
        color: 'purple',
        icon: 'Music',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'olahraga' },
      update: {},
      create: {
        name: 'Olahraga',
        slug: 'olahraga',
        description: 'Update pertandingan, transfer pemain, dan berita olahraga',
        color: 'orange',
        icon: 'Trophy',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'politik' },
      update: {},
      create: {
        name: 'Politik',
        slug: 'politik',
        description: 'Berita politik dalam dan luar negeri terkini',
        color: 'red',
        icon: 'Landmark',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kesehatan' },
      update: {},
      create: {
        name: 'Kesehatan',
        slug: 'kesehatan',
        description: 'Tips kesehatan, berita medis, dan gaya hidup sehat',
        color: 'green',
        icon: 'Heart',
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Create Admin User
  const crypto = await import('crypto')
  const hashedPassword = crypto.createHash('sha256').update('admin123').digest('hex')
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      email: 'newspedia100@gmail.com',
      role: 'admin',
    },
  })

  console.log(`✅ Created admin user: ${admin.username}`)

  // Create Default Marquee News
  const marqueeItems = [
    { text: 'Selamat datang di NewsPedia - Portal Berita Terpercaya', link: '/', order: 1 },
    { text: 'Dapatkan berita terkini setiap hari hanya di NewsPedia', link: '/', order: 2 },
    { text: 'Subscribe newsletter kami untuk update berita terbaru', link: '/', order: 3 },
  ]

  for (const item of marqueeItems) {
    await prisma.marqueeNews.upsert({
      where: { id: `marquee-${item.order}` },
      update: { text: item.text, link: item.link, order: item.order },
      create: {
        id: `marquee-${item.order}`,
        text: item.text,
        link: item.link,
        order: item.order,
        isActive: true,
      },
    })
  }

  console.log(`✅ Created ${marqueeItems.length} marquee items`)

  console.log('🎉 Production seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
