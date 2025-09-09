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

    const addresses = await prisma.address.findMany({
      where: { userId: user.userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ addresses })

  } catch (error) {
    console.error('Addresses fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const {
      firstName,
      lastName,
      company,
      address1,
      address2,
      city,
      state,
      pincode,
      country = 'India',
      phone,
      isDefault = false
    } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !address1 || !city || !state || !pincode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // If setting as default, remove default from other addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.userId },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.create({
      data: {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        pincode,
        country,
        phone,
        isDefault,
        userId: user.userId
      }
    })

    return NextResponse.json({
      message: 'Address created successfully',
      address
    })

  } catch (error) {
    console.error('Address creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}