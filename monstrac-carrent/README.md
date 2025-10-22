# Monstrac CarRent (Dark Theme, 3D Accents)

A modern car-rental portal built with Next.js 16 (App Router), Tailwind v4, framer-motion, and three.js-ready structure. Includes catalogs, product pages, basic booking flow, dashboards, and API scaffolds.

## Quick start

```bash
npm install
npm run dev
```

## Tech stack
- Next.js 16 (App Router)
- Tailwind CSS v4 (dark-first tokens)
- Framer Motion (animations)
- Prisma + SQLite (schema + seed-ready)
- SWR (data fetching in dashboards)
- Iron-session (session-based auth scaffolding)

## Features implemented
- Dark design system with neon accents and glass surfaces
- Homepage with 9 sections (Hero, Search, Categories, Featured, How it Works, Advantages, Testimonials, FAQ, Promo strip)
- Cars catalog with filter panel and responsive grid
- Car detail page with availability calendar and booking widget
- Basic dashboards (Customer and Owner/Admin) with role gates client-side
- API routes (cars, bookings, payments stub, notifications stub)
- Prisma schema for Users, Cars, Bookings, Payments

## Roadmap (high level)
- Authentication: email/password + OTP, RBAC server enforcement
- Admin CRUD: cars, drivers, bookings, customers, finance
- Payments: Stripe/Razorpay live integrations
- Notifications: SendGrid + Twilio (WhatsApp/SMS)
- Server-side filtering, search, and pagination
- 3D vehicle viewer (R3F) and Lottie micro-animations
- Accessibility and performance hardening

## API (examples)
- GET `/api/cars` — list cars
- POST `/api/bookings` — create booking (expects Prisma-shaped payload)
- POST `/api/payments/checkout` — returns `{url}` to redirect (stub)
- POST `/api/payments/webhook` — webhook ack (stub)
- POST `/api/notifications/send` — send notifications (stub)

## Database schema (Prisma)
See `prisma/schema.prisma` for:
- `User` (role: CUSTOMER | OWNER | ADMIN)
- `Car` (owner, pricing, features, availability)
- `Booking` (relations, status, totals)
- `Payment`

## Seeding
Create a simple seed script in `prisma/seed.ts` (not included) to insert sample users, cars, and bookings. Run:
```bash
npx prisma db seed
```

## Env
Create `.env` (already generated) with:
```
DATABASE_URL="file:./dev.db"
IRON_SESSION_PASSWORD="<min 32 chars>"
IRON_SESSION_COOKIE_NAME="monstrac_session"
```

## Acceptance checklist
- Responsive layouts for desktop, tablet, mobile
- Booking flow navigates from product to checkout stub
- Filters apply and counts update
- Dashboards load behind login and reflect user role
- Basic a11y: labels, focus states, keyboard nav for main controls
- Build passes: `npm run build`

## Notes
- Middleware is minimized per Next 16 guidance; consider Proxy or route handlers for auth.
- Use feature flags to toggle heavy 3D and dynamic pricing.
