export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  mrp: number
  sellingPrice: number
  sku: string
  weight?: number
  dimensions?: string
  material?: string
  color?: string
  isActive: boolean
  isFeatured: boolean
  stockQty: number
  categoryId: string
  category: Category
  images: ProductImage[]
  variants: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  products?: Product[]
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  order: number
  productId: string
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceAdjust: number
  stockQty: number
  sku?: string
  productId: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isAdmin: boolean
  isActive: boolean
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  quantity: number
  cartId: string
  productId: string
  product: Product
  variantId?: string
  variant?: ProductVariant
  createdAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  subtotal: number
  taxAmount: number
  shippingAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  paymentStatus: PaymentStatus
  paymentMethod?: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  userId: string
  user: User
  addressId: string
  address: Address
  items: OrderItem[]
  couponCode?: string
  notes?: string
  invoiceData?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  totalPrice: number
  orderId: string
  productId: string
  product: Product
  variantId?: string
  variant?: ProductVariant
  productName: string
  productSku: string
  createdAt: Date
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  pincode: string
  country: string
  phone?: string
  isDefault: boolean
  userId: string
  createdAt: Date
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT'
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  created_at: number
}

export interface RazorpayPayment {
  id: string
  entity: string
  amount: number
  currency: string
  status: string
  order_id: string
  invoice_id?: string
  international: boolean
  method: string
  amount_refunded: number
  captured: boolean
  description?: string
  card_id?: string
  bank?: string
  wallet?: string
  vpa?: string
  email: string
  contact: string
  created_at: number
}