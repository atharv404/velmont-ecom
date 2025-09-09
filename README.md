# Velmont E-Commerce - Premium Leather Accessories

A modern, production-ready e-commerce website for premium leather accessories built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Frontend
- **Modern Design**: Premium leather-inspired UI with warm browns and tan highlights
- **Responsive Layout**: Mobile-first design that works on all devices
- **Product Catalog**: Category-based navigation (Wallets, Belts, Bags, Accessories)
- **Product Details**: Detailed product pages with specifications and features
- **Shopping Cart**: Full cart functionality with quantity management
- **Hero Section**: Engaging hero section with call-to-action buttons
- **Assurance Tiles**: Trust-building elements (Quality, Shipping, Returns, Support)

### Backend Architecture (Planned)
- **Next.js API Routes**: RESTful API for product and order management
- **Prisma ORM**: Type-safe database interactions with PostgreSQL
- **Razorpay Integration**: Secure payment processing with server-side verification
- **Authentication**: Secure user authentication and session management
- **Admin Panel**: Complete admin interface for catalog management

### Security & Performance
- **OWASP ASVS Level 2**: Security controls for production readiness
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Meta tags, canonical URLs, and structured data
- **Performance**: Optimized images and code splitting

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Prisma ORM, PostgreSQL
- **Payments**: Razorpay Orders API with webhook verification
- **UI Components**: Headless UI, Heroicons
- **Development**: ESLint, TypeScript, Turbopack

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atharv404/velmont-ecom.git
   cd velmont-ecom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   📖 **For detailed setup instructions and where to get each environment variable, see [SETUP.md](SETUP.md)**
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/velmont_ecom"
   
   # Razorpay Configuration
   NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
   RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"
   
   # Application Configuration
   BASE_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   ```

4. **Database Setup** (When database is available)
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
velmont-ecom/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── categories/[slug]/  # Category pages
│   │   ├── products/[slug]/    # Product detail pages
│   │   ├── cart/              # Shopping cart
│   │   └── api/               # API routes (planned)
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Hero.tsx           # Hero section
│   │   ├── FeaturedProducts.tsx
│   │   └── AssuranceTiles.tsx
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Common utilities
│   └── types/                 # TypeScript definitions
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Seed data
└── public/                    # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Amber-900 (#78350f)
- **Secondary**: Amber-800 (#92400e)
- **Accent**: Orange-50 (#fff7ed)
- **Background**: Gray-50 (#f9fafb)

### Typography
- **Headings**: Bold, amber-950
- **Body**: Regular, gray-600/gray-900
- **System Font**: Sans-serif system stack

## 🔐 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Payment Security**: Razorpay signature verification
- **Rate Limiting**: API route protection
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Headers**: Security-first header configuration

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
```

## 🔄 Razorpay Integration (Planned)

### Order Creation Flow
1. Client requests order creation
2. Server creates Razorpay order
3. Client receives order_id and payment details
4. Razorpay checkout processes payment
5. Server verifies payment signature
6. Order status updated on successful verification

### Webhook Handling
- `order.paid` - Order payment confirmed
- `payment.captured` - Payment successfully captured
- `payment.failed` - Payment processing failed

## 📊 Database Schema

### Core Entities
- **Products**: Product catalog with variants and images
- **Categories**: Product categorization
- **Orders**: Order management with items
- **Users**: Customer accounts and addresses
- **Cart**: Shopping cart persistence

## 🎯 Current Project Status

### ✅ **Completed Features**
- **Frontend Pages**: Product catalog, categories, cart, product details
- **Database Schema**: Complete database design with Prisma ORM
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Sample Data**: Seeded products, categories, and admin user
- **Basic Structure**: Next.js 14 app router setup

### 🔄 **In Active Development**
- **Payment Integration**: Razorpay implementation (planned)
- **Authentication System**: User login/registration (planned)
- **Admin Panel**: Product and order management (planned)

### ⚠️ **Not Yet Implemented**
- **User Authentication**: No login/registration system
- **Admin Login**: Admin panel requires development
- **Payment Processing**: Razorpay integration incomplete
- **Order System**: No checkout or order management
- **API Routes**: Backend APIs need implementation

📖 **For setup instructions and admin access details, see [SETUP.md](SETUP.md)**

## 🎯 Roadmap

- [ ] **Phase 1**: Complete database integration
- [ ] **Phase 2**: Razorpay payment integration
- [ ] **Phase 3**: User authentication system
- [ ] **Phase 4**: Admin panel development
- [ ] **Phase 5**: Advanced features (reviews, wishlist)
- [ ] **Phase 6**: Performance optimization
- [ ] **Phase 7**: Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email hello@velmont.com or create an issue in the repository.

---

**Built with ❤️ for premium leather enthusiasts**
