import { notFound } from 'next/navigation'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import Link from 'next/link'

// Mock data for now since we don't have DB setup
const categories = {
  wallets: {
    name: 'Wallets',
    description: 'Premium leather wallets for men and women',
    products: [
      {
        id: '1',
        name: 'Executive Leather Wallet',
        slug: 'executive-leather-wallet',
        shortDesc: 'Premium bi-fold wallet with RFID protection',
        mrp: 4999,
        sellingPrice: 3499,
        material: 'Italian Leather',
        color: 'Brown',
        stockQty: 25,
      },
      {
        id: '2',
        name: 'Premium Cardholder Wallet',
        slug: 'premium-cardholder-wallet',
        shortDesc: 'Elegant cardholder with multiple slots',
        mrp: 2999,
        sellingPrice: 2499,
        material: 'Premium Leather',
        color: 'Black',
        stockQty: 35,
      },
    ]
  },
  belts: {
    name: 'Belts',
    description: 'Handcrafted leather belts with premium buckles',
    products: [
      {
        id: '3',
        name: 'Classic Leather Belt',
        slug: 'classic-leather-belt',
        shortDesc: 'Handcrafted genuine leather belt',
        mrp: 3499,
        sellingPrice: 2999,
        material: 'Full Grain Leather',
        color: 'Black',
        stockQty: 30,
      },
    ]
  },
  bags: {
    name: 'Bags',
    description: 'Professional bags and briefcases',
    products: [
      {
        id: '4',
        name: 'Professional Laptop Bag',
        slug: 'professional-laptop-bag',
        shortDesc: 'Spacious laptop bag with premium finish',
        mrp: 8999,
        sellingPrice: 6999,
        material: 'Italian Leather',
        color: 'Tan',
        stockQty: 15,
      },
      {
        id: '5',
        name: 'Vintage Messenger Bag',
        slug: 'vintage-messenger-bag',
        shortDesc: 'Classic messenger bag with vintage appeal',
        mrp: 7499,
        sellingPrice: 5999,
        material: 'Vintage Leather',
        color: 'Dark Brown',
        stockQty: 20,
      },
    ]
  },
  accessories: {
    name: 'Accessories',
    description: 'Leather accessories and small goods',
    products: [
      {
        id: '6',
        name: 'Minimalist Card Holder',
        slug: 'minimalist-card-holder',
        shortDesc: 'Slim design for essential cards',
        mrp: 1999,
        sellingPrice: 1499,
        material: 'Premium Leather',
        color: 'Navy',
        stockQty: 40,
      },
    ]
  },
}

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-amber-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-amber-950">{category.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{category.description}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
          </p>
          <div className="flex items-center gap-4">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
            <select 
              id="sort" 
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                  <div className="text-center text-amber-800">
                    <div className="text-6xl mb-2">
                      {slug === 'wallets' && '👛'}
                      {slug === 'belts' && '👔'}
                      {slug === 'bags' && '👜'}
                      {slug === 'accessories' && '🎫'}
                    </div>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                </div>
                
                {/* Discount Badge */}
                {product.mrp > product.sellingPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {calculateDiscountPercentage(product.mrp, product.sellingPrice)}% OFF
                  </div>
                )}

                {/* Stock Status */}
                {product.stockQty < 5 && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    Only {product.stockQty} left
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.shortDesc}
                </p>

                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                  <span>Material: {product.material}</span>
                  <span>•</span>
                  <span>Color: {product.color}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-amber-900">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    {product.mrp > product.sellingPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full bg-amber-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                  <button className="w-full border-2 border-amber-900 text-amber-900 py-3 px-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {category.products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">We&apos;re working on adding more products to this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}