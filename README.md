# Zobbi Gear - E-commerce Platform

A modern e-commerce website built for the Indian market, featuring product browsing, shopping cart, checkout flow, and admin product management.

## Features

### Storefront
- **Homepage**: Hero banner with featured products
- **Product Catalog**: Responsive grid layout with all products
- **Product Details**: Individual product pages with add-to-cart functionality
- **Shopping Cart**: Persistent cart using localStorage
- **Checkout**: Shipping information form
- **Payment**: Mock payment page (demo only, no actual payment processing)

### Admin Panel
- **Authentication**: Secure login with session management
- **Product Management**: Create, edit, and delete products
- **Image Upload**: Upload product images with preview
- **Featured Products**: Mark products to display on homepage

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **UI Library**: Material-UI (MUI) v5 + Emotion
- **Database**: SQLite + Prisma ORM
- **Authentication**: iron-session with bcrypt password hashing
- **Currency**: Indian Rupees (₹) - prices stored in paise

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update:
- `SESSION_SECRET`: Generate a random 32+ character string
- `ADMIN_SEED_PASSWORD`: Set your admin password (default: admin123)

4. Initialize the database:
```bash
npx prisma migrate dev
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Default Admin Credentials

- **Username**: `admin`
- **Password**: Value from `ADMIN_SEED_PASSWORD` in `.env` (default: `admin123`)

Access admin panel at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── products/            # Product catalog & details
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout & payment
│   ├── admin/               # Admin panel
│   └── api/                 # API routes
├── components/              # Reusable components
├── lib/                     # Utilities & database client
└── theme/                   # MUI theme configuration

prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Database seeding script
```

## Key Routes

### Storefront
- `/` - Homepage with banner and featured products
- `/products` - All products catalog
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/checkout/payment` - Payment page (mock)
- `/order-success` - Order confirmation

### Admin
- `/admin/login` - Admin login
- `/admin/products` - Product list
- `/admin/products/new` - Add new product
- `/admin/products/[id]/edit` - Edit product

## Development

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Seed database
npm run db:seed

# Open Prisma Studio
npx prisma studio
```

### Build for Production

```bash
npm run build
npm start
```

## Currency Format

All prices are stored in **paise** (1 INR = 100 paise) as integers to avoid floating-point precision issues. The `formatINR()` utility function handles conversion and formatting using `Intl.NumberFormat` with `en-IN` locale.

## Image Uploads

Product images are stored in `public/uploads/products/` and served statically. The directory is created automatically on first upload.

## Security Notes

- Admin routes are protected by session middleware
- Passwords are hashed with bcrypt (10 rounds)
- Image uploads are restricted to JPEG, PNG, and WebP formats
- Session cookies are httpOnly and secure in production

## Mobile Responsiveness

The site is fully responsive with:
- Mobile-first design using MUI breakpoints
- Touch-friendly targets (≥44px)
- Drawer navigation for mobile
- Responsive grid layouts (1-4 columns based on screen size)

## License

MIT
