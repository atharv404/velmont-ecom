'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  color?: string
  material?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Executive Leather Wallet',
      price: 3499,
      quantity: 1,
      color: 'Brown',
      material: 'Italian Leather'
    },
    {
      id: '2',
      name: 'Classic Leather Belt',
      price: 2999,
      quantity: 1,
      color: 'Black',
      material: 'Full Grain Leather'
    }
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id))
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 299900 ? 0 : 5000 // Free shipping above ₹2999
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-amber-950 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link
              href="/"
              className="bg-amber-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👜</span>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          {item.material} • {item.color}
                        </div>
                        <div className="text-lg font-bold text-amber-900 mt-2">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="text-red-600 hover:text-red-800 p-2"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                    <p className="text-sm text-amber-800">
                      Add {formatPrice(299900 - subtotal)} more for free shipping!
                    </p>
                  </div>
                )}

                <button
                  className="w-full bg-amber-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-800 transition-colors mt-6"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-amber-900 hover:text-amber-800 font-medium"
                  >
                    ← Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span>🔒</span>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span>📦</span>
                      <span>Free Returns</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span>⚡</span>
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}