import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.userId
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: {
                    order: 'asc'
                  }
                },
                category: true
              }
            },
            variant: true
          }
        }
      }
    })

    if (!cart) {
      // Create cart if doesn't exist
      const newCart = await prisma.cart.create({
        data: {
          userId: user.userId
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    orderBy: {
                      order: 'asc'
                    }
                  },
                  category: true
                }
              },
              variant: true
            }
          }
        }
      })
      
      return NextResponse.json({ cart: newCart })
    }

    // Transform prices from paise to rupees
    const transformedCart = {
      ...cart,
      items: cart.items.map(item => ({
        ...item,
        product: {
          ...item.product,
          mrp: item.product.mrp / 100,
          sellingPrice: item.product.sellingPrice / 100
        },
        variant: item.variant ? {
          ...item.variant,
          priceAdjust: item.variant.priceAdjust / 100
        } : null
      }))
    }

    return NextResponse.json({ cart: transformedCart })

  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}