import { notFound } from 'next/navigation'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import Link from 'next/link'

// Mock product data
const products = {
  'executive-leather-wallet': {
    id: '1',
    name: 'Executive Leather Wallet',
    slug: 'executive-leather-wallet',
    description: 'A premium bi-fold wallet crafted from the finest Italian leather. Features RFID protection, multiple card slots, and a cash compartment. This wallet is perfect for executives and professionals who value quality and style.',
    shortDesc: 'Premium bi-fold wallet with RFID protection',
    mrp: 4999,
    sellingPrice: 3499,
    sku: 'VLM-WLT-001',
    weight: 150,
    material: 'Italian Leather',
    color: 'Brown',
    stockQty: 25,
    category: 'Wallets',
    features: [
      'RFID Protection',
      '8 Card Slots',
      '2 Cash Compartments', 
      'Italian Leather',
      'Lifetime Warranty'
    ],
    specifications: {
      'Material': 'Italian Leather',
      'Color': 'Brown',
      'Weight': '150g',
      'Dimensions': '11 x 9 x 2 cm',
      'Card Slots': '8',
      'Cash Compartments': '2',
      'RFID Protection': 'Yes'
    }
  },
  'classic-leather-belt': {
    id: '2',
    name: 'Classic Leather Belt',
    slug: 'classic-leather-belt',
    description: 'Handcrafted genuine leather belt with a timeless design. Features a premium metal buckle and is available in multiple sizes. Perfect for both formal and casual wear.',
    shortDesc: 'Handcrafted genuine leather belt',
    mrp: 3499,
    sellingPrice: 2999,
    sku: 'VLM-BLT-001',
    weight: 300,
    material: 'Full Grain Leather',
    color: 'Black',
    stockQty: 30,
    category: 'Belts',
    features: [
      'Full Grain Leather',
      'Premium Metal Buckle',
      'Multiple Sizes',
      'Reversible Design',
      '1 Year Warranty'
    ],
    specifications: {
      'Material': 'Full Grain Leather',
      'Color': 'Black',
      'Weight': '300g',
      'Width': '3.5 cm',
      'Buckle': 'Premium Metal',
      'Sizes Available': '32", 34", 36", 38", 40", 42"'
    }
  },
  'professional-laptop-bag': {
    id: '3',
    name: 'Professional Laptop Bag',
    slug: 'professional-laptop-bag',
    description: 'Spacious laptop bag with premium finish. Perfect for professionals. Fits laptops up to 15 inches with additional compartments for documents and accessories.',
    shortDesc: 'Spacious laptop bag with premium finish',
    mrp: 8999,
    sellingPrice: 6999,
    sku: 'VLM-BAG-001',
    weight: 800,
    material: 'Italian Leather',
    color: 'Tan',
    stockQty: 15,
    category: 'Bags',
    features: [
      'Fits 15" Laptops',
      'Multiple Compartments',
      'Adjustable Strap',
      'Italian Leather',
      '2 Year Warranty'
    ],
    specifications: {
      'Material': 'Italian Leather',
      'Color': 'Tan',
      'Weight': '800g',
      'Dimensions': '40 x 30 x 10 cm',
      'Laptop Size': 'Up to 15"',
      'Compartments': '3 Main + 2 Side',
      'Strap': 'Adjustable Shoulder Strap'
    }
  },
  'minimalist-card-holder': {
    id: '4',
    name: 'Minimalist Card Holder',
    slug: 'minimalist-card-holder',
    description: 'Slim design card holder for essential cards. Perfect for those who prefer minimalist carry. Holds up to 6 cards securely with easy access.',
    shortDesc: 'Slim design for essential cards',
    mrp: 1999,
    sellingPrice: 1499,
    sku: 'VLM-ACC-001',
    weight: 50,
    material: 'Premium Leather',
    color: 'Navy',
    stockQty: 40,
    category: 'Accessories',
    features: [
      'Minimalist Design',
      'Holds 6 Cards',
      'Premium Leather',
      'Easy Access',
      '6 Month Warranty'
    ],
    specifications: {
      'Material': 'Premium Leather',
      'Color': 'Navy',
      'Weight': '50g',
      'Dimensions': '10 x 7 x 1 cm',
      'Card Capacity': '6 Cards',
      'Design': 'Minimalist Slim'
    }
  }
}

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products[slug as keyof typeof products]

  if (!product) {
    notFound()
  }

  const discountPercentage = calculateDiscountPercentage(product.mrp, product.sellingPrice)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-amber-900">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-300 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center text-amber-800">
                <div className="text-8xl mb-4">
                  {product.category === 'Wallets' && '👛'}
                  {product.category === 'Belts' && '👔'}
                  {product.category === 'Bags' && '👜'}
                  {product.category === 'Accessories' && '🎫'}
                </div>
                <p className="text-lg font-medium">{product.name}</p>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-2xl">
                    {product.category === 'Wallets' && '👛'}
                    {product.category === 'Belts' && '👔'}
                    {product.category === 'Bags' && '👜'}
                    {product.category === 'Accessories' && '🎫'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-amber-600 font-medium uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-amber-900">
                {formatPrice(product.sellingPrice)}
              </span>
              {product.mrp > product.sellingPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stockQty > 10 ? (
                <span className="text-green-600 font-medium">✓ In Stock</span>
              ) : product.stockQty > 0 ? (
                <span className="text-orange-600 font-medium">⚠ Only {product.stockQty} left</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Out of Stock</span>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <select 
                  id="quantity" 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {[...Array(Math.min(5, product.stockQty))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-4">
                <button 
                  disabled={product.stockQty === 0}
                  className="flex-1 bg-amber-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-50 transition-colors">
                  ♡
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="bg-white rounded-lg p-6 border">
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-600 font-medium">{key}:</dt>
                      <dd className="text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(products)
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                    <span className="text-4xl">
                      {relatedProduct.category === 'Wallets' && '👛'}
                      {relatedProduct.category === 'Belts' && '👔'}
                      {relatedProduct.category === 'Bags' && '👜'}
                      {relatedProduct.category === 'Accessories' && '🎫'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-900">
                        {formatPrice(relatedProduct.sellingPrice)}
                      </span>
                      {relatedProduct.mrp > relatedProduct.sellingPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(relatedProduct.mrp)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}