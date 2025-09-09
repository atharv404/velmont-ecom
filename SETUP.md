# Velmont E-Commerce Setup Guide

## 🔧 Environment Variables Setup

This guide explains where to get each environment variable and how to configure them properly.

### 1. Database Configuration

#### PostgreSQL Database (`DATABASE_URL`)

You need a PostgreSQL database. Here are your options:

**Option A: Cloud Database (Recommended for production)**
- **Neon** (Free tier available): https://neon.tech/
- **Supabase** (Free tier available): https://supabase.com/
- **Railway** (Free tier available): https://railway.app/
- **AWS RDS**: https://aws.amazon.com/rds/
- **Google Cloud SQL**: https://cloud.google.com/sql

**Option B: Local Database (For development)**
```bash
# Install PostgreSQL locally
# Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS:
brew install postgresql

# Start PostgreSQL and create database
sudo -u postgres createuser velmont_user
sudo -u postgres createdb velmont_ecom
sudo -u postgres psql -c "ALTER USER velmont_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE velmont_ecom TO velmont_user;"
```

**Database URL Format:**
```
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

### 2. Razorpay Payment Gateway

#### Getting Razorpay Credentials

1. **Create Razorpay Account**
   - Visit: https://razorpay.com/
   - Sign up for a business account
   - Complete KYC verification

2. **Get API Keys**
   - Login to Razorpay Dashboard: https://dashboard.razorpay.com/
   - Go to **Settings** → **API Keys**
   - Click **Generate API Key**
   - Copy both **Key Id** and **Key Secret**

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"  # Public key (test mode starts with rzp_test_)
   RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"              # Same as above
   RAZORPAY_KEY_SECRET="your_secret_key_here"          # Private secret key
   ```

4. **Webhook Configuration**
   - Go to **Settings** → **Webhooks**
   - Click **Add New Webhook**
   - URL: `https://yourdomain.com/api/webhooks/razorpay`
   - Events: Select `order.paid`, `payment.captured`, `payment.failed`
   - Copy the **Webhook Secret**
   ```env
   RAZORPAY_WEBHOOK_SECRET="your_webhook_secret_here"
   ```

### 3. Application Configuration

#### NextAuth Secret (`NEXTAUTH_SECRET`)

Generate a secure random string:

**Option A: Using OpenSSL**
```bash
openssl rand -base64 32
```

**Option B: Using Online Generator**
- Visit: https://generate-secret.vercel.app/32
- Copy the generated secret

**Option C: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Base URL (`BASE_URL`)
```env
# Development
BASE_URL="http://localhost:3000"

# Production
BASE_URL="https://yourdomain.com"
```

## 🔐 Admin Access

### Current Status: ⚠️ **Admin Panel Not Yet Implemented**

The project currently has:
- ✅ Database schema with User model (including `isAdmin` field)
- ✅ Admin user seeded in database (`admin@velmont.com`)
- ❌ **No authentication system implemented**
- ❌ **No admin login page**
- ❌ **No admin panel/dashboard**

### Admin User Details (from seed data)
```
Email: admin@velmont.com
Password: admin123
```

### What Needs to Be Implemented

To enable admin login, the following features need to be developed:

1. **Authentication System**
   - NextAuth.js integration
   - Login/logout functionality
   - Session management

2. **Admin Routes & Middleware**
   - Protected admin routes
   - Admin role verification
   - Admin-only API endpoints

3. **Admin Panel Pages**
   - Admin dashboard
   - Product management
   - Order management
   - User management

4. **API Routes**
   - Authentication endpoints
   - Admin CRUD operations
   - Protected API routes

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/atharv404/velmont-ecom.git
   cd velmont-ecom
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data (including admin user)
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📋 Current Project Status

### ✅ Completed Features
- Product catalog and categories
- Product detail pages
- Shopping cart functionality
- Responsive design
- Database schema (Prisma)
- Sample data seeding
- Basic frontend pages

### 🔄 In Development
- Payment integration (Razorpay)
- User authentication
- Admin panel
- Order management

### ❌ Not Yet Implemented
- User registration/login
- Admin authentication
- Payment processing
- Order checkout
- Email notifications
- Image upload system

## 🤝 Need Help?

For any setup issues or questions:
1. Check the main README.md for additional information
2. Review the Prisma schema in `prisma/schema.prisma`
3. Examine the seed file in `prisma/seed.ts` for sample data structure
4. Create an issue in the repository for specific problems

## 🔧 Development Roadmap

To make this a fully functional e-commerce platform:

1. **Phase 1**: Implement authentication system
2. **Phase 2**: Build admin panel and dashboard
3. **Phase 3**: Complete Razorpay payment integration
4. **Phase 4**: Add order management system
5. **Phase 5**: Implement email notifications
6. **Phase 6**: Add image upload capabilities
7. **Phase 7**: Production deployment and testing