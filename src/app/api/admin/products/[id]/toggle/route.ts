import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'

interface RouteParams {
  id: string
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const user = await authenticateRequest(request)
    
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { id } = await params
    const { isActive } = await request.json()

    const product = await prisma.product.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        name: true,
        isActive: true
      }
    })

    return NextResponse.json({
      message: `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
      product
    })

  } catch (error) {
    console.error('Product toggle error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}