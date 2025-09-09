'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/utils'

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    sellingPrice: number
    images: Array<{ url: string; alt: string | null }>
  }
  variant?: {
    id: string
    name: string
    value: string
    priceAdjust: number
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchCart()
    loadRazorpayScript()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCart(data.cart)
      } else if (response.status === 401) {
        router.push('/auth/login')
      } else {
        setError('Failed to fetch cart')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const loadRazorpayScript = () => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
  }

  const calculateSubtotal = () => {
    if (!cart) return 0
    return cart.items.reduce((total, item) => {
      const unitPrice = item.variant 
        ? item.product.sellingPrice + item.variant.priceAdjust
        : item.product.sellingPrice
      return total + (unitPrice * item.quantity)
    }, 0)
  }

  const handlePayment = async () => {
    if (!cart || cart.items.length === 0) {
      setError('Cart is empty')
      return
    }

    setProcessing(true)
    setError('')

    try {
      // Create default address for demo
      const addressResponse = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Demo',
          lastName: 'User',
          address1: '123 Demo Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          phone: '9876543210',
          isDefault: true
        })
      })

      let addressId
      if (addressResponse.ok) {
        const addressData = await addressResponse.json()
        addressId = addressData.address.id
      } else {
        // If address creation fails, might already exist, fetch existing
        const existingResponse = await fetch('/api/user/addresses')
        if (existingResponse.ok) {
          const existingData = await existingResponse.json()
          addressId = existingData.addresses[0]?.id
        }
      }

      if (!addressId) {
        setError('Failed to create shipping address')
        return
      }

      // Create order
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressId })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Velmont',
        description: 'Premium Leather Accessories',
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })

            if (verifyResponse.ok) {
              const verifyData = await verifyResponse.json()
              router.push(`/order-success?orderNumber=${verifyData.orderNumber}`)
            } else {
              setError('Payment verification failed')
            }
          } catch (error) {
            setError('Payment verification failed')
          }
        },
        prefill: {
          name: 'Demo User',
          email: 'demo@velmont.com',
          contact: '9876543210'
        },
        theme: {
          color: '#78350f'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      setError('Payment initialization failed')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading checkout...</div>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-amber-900 text-white px-6 py-3 rounded-md hover:bg-amber-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal >= 299900 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => {
                const unitPrice = item.variant 
                  ? item.product.sellingPrice + item.variant.priceAdjust
                  : item.product.sellingPrice
                const totalPrice = unitPrice * item.quantity

                return (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt || item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-2xl">📦</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-gray-500">
                          {item.variant.name}: {item.variant.value}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(totalPrice)}</div>
                      <div className="text-sm text-gray-500">{formatPrice(unitPrice)} each</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-amber-900 text-white py-3 px-4 rounded-md hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {processing ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}