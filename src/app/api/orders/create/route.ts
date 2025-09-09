import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { generateOrderNumber } from '@/lib/utils'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { addressId, couponCode } = await request.json()

    if (!addressId) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      )
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Verify address belongs to user
    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.userId) {
      return NextResponse.json(
        { error: 'Invalid address' },
        { status: 400 }
      )
    }

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of cart.items) {
      const unitPrice = item.variant 
        ? item.product.sellingPrice + item.variant.priceAdjust
        : item.product.sellingPrice
      
      const totalPrice = unitPrice * item.quantity
      subtotal += totalPrice

      orderItems.push({
        quantity: item.quantity,
        unitPrice,
        totalPrice,
        productId: item.productId,
        variantId: item.variantId,
        productName: item.product.name,
        productSku: item.product.sku
      })
    }

    const taxAmount = 0 // Can be calculated based on location
    const shippingAmount = subtotal >= 299900 ? 0 : 5000 // Free shipping over ₹2999
    let discountAmount = 0

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode }
      })

      if (coupon && coupon.isActive && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
        if (coupon.type === 'PERCENTAGE') {
          discountAmount = Math.min(
            (subtotal * coupon.value) / 100,
            coupon.maxDiscount || Infinity
          )
        } else {
          discountAmount = coupon.value
        }
      }
    }

    const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.userId,
        cartId: cart.id
      }
    })

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        status: 'PENDING',
        subtotal,
        taxAmount,
        shippingAmount,
        discountAmount,
        totalAmount,
        paymentStatus: 'PENDING',
        userId: user.userId,
        addressId,
        couponCode,
        razorpayOrderId: razorpayOrder.id,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true,
        address: true
      }
    })

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: 'INR',
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}