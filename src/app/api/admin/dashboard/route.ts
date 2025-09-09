import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Fetch dashboard statistics
    const [
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers
    ] = await Promise.all([
      // Total orders
      prisma.order.count(),
      
      // Total revenue (sum of all completed orders)
      prisma.order.aggregate({
        _sum: {
          totalAmount: true
        },
        where: {
          paymentStatus: 'COMPLETED'
        }
      }).then(result => (result._sum.totalAmount || 0) / 100), // Convert from paise to rupees
      
      // Total active products
      prisma.product.count({
        where: {
          isActive: true
        }
      }),
      
      // Total active users
      prisma.user.count({
        where: {
          isActive: true
        }
      })
    ])

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalProducts,
        totalUsers
      }
    })

  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}