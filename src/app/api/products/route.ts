import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    const take = limit ? parseInt(limit) : undefined
    const skip = page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined

    const where: any = {
      isActive: true
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug
      }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: {
            order: 'asc'
          }
        },
        variants: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take,
      skip
    })

    // Transform prices from paise to rupees for frontend
    const transformedProducts = products.map(product => ({
      ...product,
      mrp: product.mrp / 100,
      sellingPrice: product.sellingPrice / 100,
      variants: product.variants.map(variant => ({
        ...variant,
        priceAdjust: variant.priceAdjust / 100
      }))
    }))

    return NextResponse.json({ products: transformedProducts })

  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}