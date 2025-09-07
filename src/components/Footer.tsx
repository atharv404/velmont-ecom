import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VELMONT</h3>
            <p className="text-amber-200 mb-4">
              Premium leather accessories crafted for the modern professional. 
              Quality that speaks, style that lasts.
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 Mumbai, Maharashtra, India</p>
              <p>📧 hello@velmont.com</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-200">
              <li>
                <Link href="/categories/wallets" className="hover:text-white transition-colors">
                  Wallets
                </Link>
              </li>
              <li>
                <Link href="/categories/belts" className="hover:text-white transition-colors">
                  Belts
                </Link>
              </li>
              <li>
                <Link href="/categories/bags" className="hover:text-white transition-colors">
                  Bags
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-amber-200">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-white transition-colors">
                  Leather Care
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-amber-200">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm">
              © 2024 Velmont. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="h-6 w-12 bg-amber-200 rounded flex items-center justify-center text-xs text-amber-800">Visa</div>
              <div className="h-6 w-12 bg-amber-200 rounded flex items-center justify-center text-xs text-amber-800">MC</div>
              <div className="h-6 w-12 bg-amber-200 rounded flex items-center justify-center text-xs text-amber-800">RZP</div>
              <div className="h-6 w-12 bg-amber-200 rounded flex items-center justify-center text-xs text-amber-800">UPI</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}