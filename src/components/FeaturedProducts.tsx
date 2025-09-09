'use client'

import Link from 'next/link'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  shortDesc: string | null
  mrp: number
  sellingPrice: number
  category: {
    name: string
  }
  images: Array<{
    url: string
    alt: string | null
  }>
  material: string | null
  color: string | null
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=4')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-950 mb-4">Featured Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loading our most popular pieces...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-950 mb-4">Featured Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular pieces, loved by customers for their exceptional quality and timeless design
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => {
            const discountPercentage = calculateDiscountPercentage(product.mrp, product.sellingPrice)
            const primaryImage = product.images?.[0]

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.alt || product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-amber-800">
                        <div className="text-6xl mb-2">
                          {product.category.name === 'Wallets' && '👛'}
                          {product.category.name === 'Belts' && '👔'}
                          {product.category.name === 'Bags' && '👜'}
                          {product.category.name === 'Accessories' && '🎫'}
                        </div>
                        <p className="text-sm font-medium">{product.name}</p>
                      </div>
                    )}
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                      {product.category.name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.shortDesc || 'Premium leather accessory'}
                  </p>

                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    {product.material && (
                      <>
                        <span>Material: {product.material}</span>
                        {product.color && (
                          <>
                            <span>•</span>
                            <span>Color: {product.color}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-amber-900">
                        {formatPrice(product.sellingPrice)}
                      </span>
                      {product.mrp !== product.sellingPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full bg-amber-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/collections/featured"
            className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors border-2 border-amber-900"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}