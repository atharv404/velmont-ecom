import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'wallets' },
      update: {},
      create: {
        name: 'Wallets',
        slug: 'wallets',
        description: 'Premium leather wallets for men and women',
        image: '/images/categories/wallets.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'belts' },
      update: {},
      create: {
        name: 'Belts',
        slug: 'belts',
        description: 'Handcrafted leather belts with premium buckles',
        image: '/images/categories/belts.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bags' },
      update: {},
      create: {
        name: 'Bags',
        slug: 'bags',
        description: 'Professional bags and briefcases',
        image: '/images/categories/bags.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Leather accessories and small goods',
        image: '/images/categories/accessories.jpg',
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create sample products
  const products = [
    {
      name: 'Executive Leather Wallet',
      slug: 'executive-leather-wallet',
      description: 'A premium bi-fold wallet crafted from the finest Italian leather. Features RFID protection, multiple card slots, and a cash compartment.',
      shortDesc: 'Premium bi-fold wallet with RFID protection',
      mrp: 4999,
      sellingPrice: 3499,
      sku: 'VLM-WLT-001',
      weight: 150,
      material: 'Italian Leather',
      color: 'Brown',
      isFeatured: true,
      stockQty: 25,
      categoryId: categories[0].id, // Wallets
    },
    {
      name: 'Classic Leather Belt',
      slug: 'classic-leather-belt',
      description: 'Handcrafted genuine leather belt with a timeless design. Features a premium metal buckle and is available in multiple sizes.',
      shortDesc: 'Handcrafted genuine leather belt',
      mrp: 3499,
      sellingPrice: 2999,
      sku: 'VLM-BLT-001',
      weight: 300,
      material: 'Full Grain Leather',
      color: 'Black',
      isFeatured: true,
      stockQty: 30,
      categoryId: categories[1].id, // Belts
    },
    {
      name: 'Professional Laptop Bag',
      slug: 'professional-laptop-bag',
      description: 'Spacious laptop bag with premium finish. Perfect for professionals. Fits laptops up to 15 inches with additional compartments.',
      shortDesc: 'Spacious laptop bag with premium finish',
      mrp: 8999,
      sellingPrice: 6999,
      sku: 'VLM-BAG-001',
      weight: 800,
      material: 'Italian Leather',
      color: 'Tan',
      isFeatured: true,
      stockQty: 15,
      categoryId: categories[2].id, // Bags
    },
    {
      name: 'Minimalist Card Holder',
      slug: 'minimalist-card-holder',
      description: 'Slim design card holder for essential cards. Perfect for those who prefer minimalist carry. Holds up to 6 cards securely.',
      shortDesc: 'Slim design for essential cards',
      mrp: 1999,
      sellingPrice: 1499,
      sku: 'VLM-ACC-001',
      weight: 50,
      material: 'Premium Leather',
      color: 'Navy',
      isFeatured: true,
      stockQty: 40,
      categoryId: categories[3].id, // Accessories
    },
    {
      name: 'Vintage Messenger Bag',
      slug: 'vintage-messenger-bag',
      description: 'Classic messenger bag with vintage appeal. Perfect for daily use with multiple compartments and adjustable strap.',
      shortDesc: 'Classic messenger bag with vintage appeal',
      mrp: 7499,
      sellingPrice: 5999,
      sku: 'VLM-BAG-002',
      weight: 600,
      material: 'Vintage Leather',
      color: 'Dark Brown',
      isFeatured: false,
      stockQty: 20,
      categoryId: categories[2].id, // Bags
    },
    {
      name: 'Premium Cardholder Wallet',
      slug: 'premium-cardholder-wallet',
      description: 'Elegant cardholder wallet with multiple slots. Crafted from premium leather with a sleek design.',
      shortDesc: 'Elegant cardholder with multiple slots',
      mrp: 2999,
      sellingPrice: 2499,
      sku: 'VLM-WLT-002',
      weight: 100,
      material: 'Premium Leather',
      color: 'Black',
      isFeatured: false,
      stockQty: 35,
      categoryId: categories[0].id, // Wallets
    },
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })
  }

  console.log('✅ Products created')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.user.upsert({
    where: { email: 'admin@velmont.com' },
    update: {},
    create: {
      email: 'admin@velmont.com',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      passwordHash: hashedPassword,
      emailVerified: true,
    },
  })

  console.log('✅ Admin user created')

  // Create content blocks for homepage
  await prisma.contentBlock.upsert({
    where: { key: 'hero_section' },
    update: {},
    create: {
      key: 'hero_section',
      title: 'Hero Section',
      content: {
        heading: 'Premium Leather Accessories',
        subheading: 'Handcrafted excellence meets timeless design',
        description: 'Discover our collection of premium wallets, belts, and bags made from the finest Italian leather.',
        primaryButton: {
          text: 'Shop Collection',
          link: '/collections/featured'
        },
        secondaryButton: {
          text: 'Our Story',
          link: '/about'
        }
      },
    },
  })

  await prisma.contentBlock.upsert({
    where: { key: 'assurance_tiles' },
    update: {},
    create: {
      key: 'assurance_tiles',
      title: 'Assurance Tiles',
      content: {
        heading: 'The Velmont Promise',
        subheading: 'We stand behind every product with guarantees that matter to you',
        tiles: [
          {
            icon: 'shield',
            title: 'Premium Quality',
            description: 'Handcrafted from finest Italian leather with lifetime warranty on craftsmanship.'
          },
          {
            icon: 'truck',
            title: 'Free Shipping',
            description: 'Complimentary shipping on orders above ₹2,999. Express delivery available.'
          },
          {
            icon: 'return',
            title: 'Easy Returns',
            description: '30-day hassle-free returns and exchanges. No questions asked.'
          },
          {
            icon: 'support',
            title: '24/7 Support',
            description: 'Dedicated customer support via chat, email, and phone. Always here to help.'
          }
        ]
      },
    },
  })

  console.log('✅ Content blocks created')

  // Create sample coupons
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      name: 'Welcome Discount',
      description: '10% off on your first order',
      type: 'PERCENTAGE',
      value: 10,
      minAmount: 200000, // ₹2000 in paise
      isActive: true,
      expiresAt: new Date('2024-12-31'),
    },
  })

  await prisma.coupon.upsert({
    where: { code: 'SAVE500' },
    update: {},
    create: {
      code: 'SAVE500',
      name: 'Flat ₹500 Off',
      description: 'Flat ₹500 off on orders above ₹5000',
      type: 'FIXED_AMOUNT',
      value: 50000, // ₹500 in paise
      minAmount: 500000, // ₹5000 in paise
      isActive: true,
      expiresAt: new Date('2024-12-31'),
    },
  })

  console.log('✅ Coupons created')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })