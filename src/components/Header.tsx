'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Wallets', href: '/categories/wallets' },
  { name: 'Belts', href: '/categories/belts' },
  { name: 'Bags', href: '/categories/bags' },
  { name: 'Accessories', href: '/categories/accessories' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-amber-100">
      {/* Top bar */}
      <div className="bg-amber-950 text-amber-50 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <p>Free shipping on orders above ₹2,999</p>
            <div className="flex space-x-4">
              <Link href="/track-order" className="hover:text-amber-200 transition-colors">
                Track Order
              </Link>
              <Link href="/contact" className="hover:text-amber-200 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-amber-900">
              VELMONT
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-amber-900 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-900 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-amber-900 transition-colors">
              <HeartIcon className="h-6 w-6" />
            </button>
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-amber-900 transition-colors relative"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link 
              href="/account" 
              className="text-gray-700 hover:text-amber-900 transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-amber-900 transition-colors relative">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              type="button"
              className="text-gray-700 hover:text-amber-900 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-full max-w-sm bg-white h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-amber-900 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-4" />
                <Link
                  href="/account"
                  className="block text-gray-700 hover:text-amber-900 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/track-order"
                  className="block text-gray-700 hover:text-amber-900 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Track Order
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-700 hover:text-amber-900 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}