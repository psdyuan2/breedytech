# Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Set Up Database
```bash
# Run migrations
npx prisma migrate dev

# Seed initial data (admin user + 6 sample products)
npm run db:seed
```

## 3. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

## 4. Access Admin Panel

Navigate to: **http://localhost:3000/admin/login**

**Default Credentials:**
- Username: `admin`
- Password: `admin123` (or value from `.env` ADMIN_SEED_PASSWORD)

## 5. Test the Flow

### Customer Journey:
1. Browse products on homepage
2. Click a product to view details
3. Add to cart with quantity
4. View cart and proceed to checkout
5. Fill shipping information
6. Complete mock payment
7. See order confirmation

### Admin Journey:
1. Login to admin panel
2. View existing products
3. Click "Add Product"
4. Fill form: Name, Slug, Description, Price (INR), Upload Image
5. Check "Featured" to show on homepage
6. Save and verify product appears on storefront

## Troubleshooting

**Port 3000 in use:**
```bash
# Windows
taskkill /F /IM node.exe

# Or change port
npm run dev -- -p 3001
```

**Database issues:**
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
npm run db:seed
```

**Session errors:**
Ensure `SESSION_SECRET` in `.env` is at least 32 characters.

## Key URLs

- **Storefront**: http://localhost:3000
- **Products**: http://localhost:3000/products
- **Cart**: http://localhost:3000/cart
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Products**: http://localhost:3000/admin/products

## Environment Variables

Required in `.env`:
```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-32-char-secret-here"
ADMIN_SEED_PASSWORD="admin123"
```

## Next Steps

- Upload real product images via admin panel
- Customize banner text and styling
- Add more products
- Test on mobile devices
- Deploy to production (Vercel, etc.)
