'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get('orderNumber')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!orderNumber) {
      router.push('/')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [orderNumber, router])

  if (!orderNumber) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Order Successful!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order Number</h2>
              <p className="text-2xl font-bold text-amber-900">{orderNumber}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• We'll notify you when your order ships</li>
                <li>• Track your order anytime in your account</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Link
                href="/account/orders"
                className="w-full bg-amber-900 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors block text-center"
              >
                View Order Details
              </Link>
              
              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors block text-center"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="text-sm text-gray-500">
              Redirecting to homepage in {countdown} seconds...
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:hello@velmont.com" className="text-amber-900 hover:text-amber-800">
              hello@velmont.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}