import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-950 leading-tight">
              Premium
              <span className="block text-amber-800">Leather</span>
              <span className="block">Accessories</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed">
              Handcrafted excellence meets timeless design. Discover our collection 
              of premium wallets, belts, and bags made from the finest Italian leather.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/collections/featured"
                className="bg-amber-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="border-2 border-amber-900 text-amber-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-900 hover:text-white transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] w-full">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-900 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">👜</span>
                    </div>
                    <p className="text-lg font-medium">Premium Leather Collection</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Free Shipping
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-amber-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-amber-200">
              Lifetime Warranty
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
    </section>
  )
}