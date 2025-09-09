import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import crypto from 'crypto'

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
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId 
    } = await request.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Update order status
    const order = await prisma.order.update({
      where: { 
        id: orderId,
        userId: user.userId
      },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'CONFIRMED',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      }
    })

    // Clear user's cart after successful payment
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: user.userId
        }
      }
    })

    // Update product stock quantities
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
      include: { product: true }
    })

    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQty: {
            decrement: item.quantity
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: order.id,
      orderNumber: order.orderNumber
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}