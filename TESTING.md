# Testing Checklist for Zobbi Gear

## Storefront Flow (Desktop & Mobile)

### Homepage
- [ ] Banner displays with gradient background
- [ ] "Shop Now" button navigates to `/products`
- [ ] Featured products grid shows 6 items (3 columns on desktop, 1-2 on mobile)
- [ ] Product cards show image, name, and ₹ price
- [ ] "View All Products" button works
- [ ] Cart badge in header shows count

### Products Page
- [ ] All 6 seeded products display
- [ ] Grid responsive: 4 columns (desktop) → 2-3 (tablet) → 1-2 (mobile)
- [ ] Click product card navigates to detail page
- [ ] Prices formatted as ₹8,500.00 (Indian format)

### Product Detail Page
- [ ] Product image, name, description, price display correctly
- [ ] Quantity input works (minimum 1)
- [ ] "Add to Cart" button shows success snackbar
- [ ] Cart badge updates with item count

### Shopping Cart
- [ ] Empty cart shows "Your cart is empty" message
- [ ] Cart items show image, name, price, quantity
- [ ] Quantity can be updated (TextField)
- [ ] Delete button removes items
- [ ] Subtotals and total calculate correctly
- [ ] "Proceed to Checkout" navigates to `/checkout`

### Checkout
- [ ] Form fields: Full Name, Phone (10 digits), Address, City, PIN Code (6 digits)
- [ ] Order summary shows all items and total
- [ ] Form validation works
- [ ] "Continue to Payment" saves info and navigates

### Payment
- [ ] Total amount displays correctly
- [ ] Payment method radio buttons work (UPI, Card, Net Banking, COD)
- [ ] "This is a demo payment" disclaimer shows
- [ ] "Confirm Payment" creates order and shows success
- [ ] Redirects to order success page with order number (ZG...)
- [ ] Cart clears after successful payment

## Admin Panel

### Login
- [ ] Navigate to `/admin/login`
- [ ] Username: `admin`, Password: from `.env` (default `admin123`)
- [ ] Invalid credentials show error
- [ ] Successful login redirects to `/admin/products`

### Product List
- [ ] Table shows all products with Name, Slug, Price, Featured chip
- [ ] Edit icon navigates to edit page
- [ ] Delete icon opens confirmation dialog
- [ ] Delete removes product and refreshes list
- [ ] "Add Product" button navigates to new product page

### Create Product
- [ ] All fields required: Name, Slug, Description, Price (INR), Image
- [ ] Slug auto-lowercases
- [ ] Price accepts decimals (e.g., 8500.00)
- [ ] Featured checkbox works
- [ ] Image upload shows preview
- [ ] Duplicate slug shows error
- [ ] Success redirects to product list
- [ ] New product appears in storefront

### Edit Product
- [ ] Form pre-fills with existing data
- [ ] Image shows current product image
- [ ] Can update without changing image
- [ ] "Replace Image" uploads new image
- [ ] Updates reflect in storefront immediately

### Session & Security
- [ ] Accessing `/admin/products` without login redirects to login
- [ ] Logout button clears session
- [ ] After logout, admin routes redirect to login

## Mobile-Specific Tests

### Navigation
- [ ] Mobile: Menu icon (hamburger) opens drawer
- [ ] Drawer shows Home, Products links
- [ ] Cart icon accessible on mobile
- [ ] Touch targets ≥44px (buttons, icons)

### Layout
- [ ] Banner text readable on small screens
- [ ] Product cards stack properly (1-2 columns)
- [ ] Cart items layout vertically on mobile
- [ ] Checkout form fields full-width on mobile
- [ ] Admin table scrolls horizontally or shows cards on mobile

## Cross-Browser
- [ ] Chrome/Edge
- [ ] Safari (iOS)
- [ ] Firefox

## Performance
- [ ] First page load < 3s
- [ ] Navigation feels instant (client-side routing)
- [ ] Images load progressively
- [ ] No console errors

## Accessibility
- [ ] All interactive elements keyboard-navigable
- [ ] Form labels associated with inputs
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader friendly (MUI components)
