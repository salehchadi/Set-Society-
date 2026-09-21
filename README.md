# SET SOCIETY — Atelier & E-Commerce

<div align="center">
  <h3>Minimalist Luxury Fashion Atelier</h3>
  <p>High-end editorial fashion featuring curated minimalist collections, dual-layer textures, and artisanal craftsmanship.</p>
</div>

---

## ✦ Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Database & Live Inventory Architecture](#-database--live-inventory-architecture)
  - [Google Sheets CSV Integration](#google-sheets-csv-integration)
  - [Dynamic Selling Price (`price`)](#dynamic-selling-price-price)
  - [Dynamic Sale Badges & Strikethrough (`real price`)](#dynamic-sale-badges--strikethrough-real-price)
- [Order Checkout Pipeline](#-order-checkout-pipeline)
- [Meta Pixel Event Tracking](#-meta-pixel-event-tracking)
- [Phased Project Roadmap](#-phased-project-roadmap)
- [Local Development & Deployment](#-local-development--deployment)

---

## ✦ Overview
**SET SOCIETY** is a modern, high-performance fashion atelier e-commerce application crafted for minimalist luxury apparel (jackets, pants, and coordinated sets). The platform combines editorial aesthetic layouts with real-time inventory and pricing management powered directly by Google Sheets.

---

## ✦ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email/Order Dispatch**: [Web3Forms API](https://web3forms.com/)
- **Analytics & Conversion Tracking**: Meta Pixel (Facebook Pixel)

---

## ✦ Database & Live Inventory Architecture

### Google Sheets CSV Integration
The storefront uses a published Google Sheet as a live, serverless database. The application polls the published CSV endpoint every 5 minutes and upon user sessions via [`src/context/InventoryContext.tsx`](src/context/InventoryContext.tsx).

- **Published CSV URL**: Configured in `InventoryContext.tsx`
- **Supported Headers**: `ProductID,Size,StockCount,price,real price`

### Dynamic Selling Price (`price`)
- Products default to fallback values defined in [`src/assets/constants.ts`](src/assets/constants.ts) (e.g., Everyday Sets at 1500 EGP).
- When a numeric value is entered into the `price` column of the Google Sheet, `InventoryContext` dynamically overrides the product price across the entire application in real time (product cards, product detail pages, sort filters, and shopping cart).

### Dynamic Sale Badges & Strikethrough (`real price`)
- The Google Sheet supports a 5th column named **`real price`** (or `originalPrice`).
- **Automated SALE Rule**: If `real price` > current `price`:
  - A prominent red **`SALE`** badge is rendered on the product card and product page.
  - The original price is displayed with a strikethrough (e.g. ~~2400 EGP~~ **1500 EGP**).
  - The savings amount (`Save X EGP`) is automatically calculated and shown to the customer.

---

## ✦ Order Checkout Pipeline
1. **Cart Management**: [`src/context/CartContext.tsx`](src/context/CartContext.tsx) manages selections, sizes, and quantities.
2. **Delivery Scope**: Delivery available exclusively in Cairo & Giza with standard shipping (80 EGP).
3. **Form Submission**: Submissions in [`src/pages/CartPage.tsx`](src/pages/CartPage.tsx) route customer details and itemized breakdown via the Web3Forms API.
4. **Order Confirmation**: Upon submission, a `Purchase` event is sent to Meta Pixel and customer cart is cleared.

---

## ✦ Meta Pixel Event Tracking
Meta Pixel tracking is centralized in [`src/utils/pixel.ts`](src/utils/pixel.ts):
- `PageView`: Fired on every route change via `RouteTracker` in `App.tsx`.
- `ViewContent`: Fired when viewing a product in `ProductDetailsPage.tsx`.
- `AddToCart`: Fired when adding an item to cart in `ProductCard.tsx` or `ProductDetailsPage.tsx`.
- `InitiateCheckout`: Fired when opening checkout delivery modal in `CartPage.tsx`.
- `Purchase`: Fired upon successful order submission in `CartPage.tsx`.

---

## ✦ Phased Project Roadmap

### Phase 1: Foundation & Dynamic Catalog (Completed)
- [x] High-end luxury editorial UI (Home, Products, Details, About, Returns).
- [x] Responsive layout with micro-animations.
- [x] Google Sheets CSV integration for real-time stock counts.
- [x] Dynamic selling price support (`price` column).
- [x] Dynamic `real price` support with automated SALE badges.
- [x] Catalog prices updated (Everyday Sets at 1500 EGP).
- [x] Meta Pixel complete e-commerce event pipeline.

### Phase 2: Cart Dynamic Synchronization & Stock Guard (Completed)
- [x] Real-time price synchronization between `InventoryContext` and existing cart items.
- [x] Stock limit guard preventing users from adding more quantity than available in stock.
- [x] Disable cart quantity increment buttons when max available stock is reached.
- [x] Resolve all strict TypeScript compiler warnings across pages (`npm run lint` 0 errors).
- [x] Update documentation with Phase 2 completions.

### Phase 3: Order Management & Instant Customer Connect (Next Phase)
- [ ] Instant WhatsApp direct checkout option with prefilled formatted cart text.
- [ ] Out-of-Stock cart item warning banners if stock changes while items are in cart.
- [ ] Optional promo/coupon discount code engine.
- [ ] Customer order receipt download/view.

### Phase 4: Atelier Expansion & Performance (Future Phase)
- [ ] Custom admin dashboard for order management and CSV export.
- [ ] Multi-currency switcher (USD, EUR, SAR, AED).
- [ ] Automated stock low alert webhooks.

---

## ✦ Local Development & Deployment

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (.env)
VITE_META_PIXEL_ID="1566529875188469"

# 3. Start local development server
npm run dev

# 4. Type check and build
npm run lint
npm run build
```

### Deployment
Pushes to the `main` branch automatically build and deploy via Vercel as defined in [`vercel.json`](vercel.json).
