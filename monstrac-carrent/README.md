# Monstrac CarRent - Premium Car Rental Portal

A world-class car rental web portal with a dark theme, high animations, and 3D accents. Built with React, TypeScript, Tailwind CSS, and Three.js.

## Features

### 🚗 Core Features
- **Modern Dark Theme**: Deep charcoal backgrounds with neon accent colors
- **3D Visualizations**: Interactive 3D car models using Three.js
- **Smooth Animations**: Lottie micro-animations and scroll-based transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Real-time Search**: Advanced filtering with instant results
- **Multi-role Support**: Customer and Admin/Owner dashboards

### 🎯 Key Pages
1. **Homepage** (9+ sections)
   - Hero with 3D car visualization
   - Smart booking form
   - Vehicle categories
   - Featured cars carousel
   - How it works flow
   - Customer testimonials
   - FAQ section
   - Limited-time offers

2. **Cars Catalog**
   - Grid/List view toggle
   - Advanced filters (price, type, features)
   - Real-time availability
   - Quick booking option

3. **Authentication**
   - Email/Password login
   - OTP-based quick login
   - Social login ready

4. **Customer Dashboard**
   - Booking management
   - Wallet & payments
   - Referral program
   - Profile management

5. **Admin Dashboard**
   - Fleet management
   - Driver management
   - Booking oversight
   - Financial reports
   - Customer management

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 3 + Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Routing**: React Router v6
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod
- **Icons**: Heroicons + Lucide
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd monstrac-carrent
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## Project Structure

```
monstrac-carrent/
├── src/
│   ├── components/
│   │   ├── common/         # Header, Footer, etc.
│   │   ├── sections/       # Homepage sections
│   │   ├── ui/            # Reusable UI components
│   │   ├── forms/         # Form components
│   │   └── dashboard/     # Dashboard components
│   ├── pages/             # Route pages
│   ├── layouts/           # Layout components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── assets/            # Images, 3D models, etc.
├── public/                # Static assets
└── dist/                  # Production build
```

## Design System

### Colors
- **Dark Palette**: `dark-50` to `dark-950`
- **Neon Accents**: 
  - Primary: `#00d9ff` (Cyan)
  - Secondary: `#bd00ff` (Purple)
  - Success: `#00ff88` (Green)
  - Warning: `#ffdd00` (Yellow)
  - Danger: `#ff0084` (Pink)

### Typography
- **Display Font**: Montserrat
- **Body Font**: Inter

### Components
- Glassmorphic cards with backdrop blur
- Neon glow effects on hover
- Smooth scroll animations
- 3D tilt effects

## Performance Optimizations

- Lazy loading for routes
- Image optimization
- Code splitting
- Memoization for expensive computations
- Virtual scrolling for large lists
- Debounced search inputs

## Accessibility

- WCAG AA compliant color contrast
- Keyboard navigation support
- ARIA labels and semantic HTML
- Focus indicators
- Screen reader friendly

## Future Enhancements

- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] WhatsApp/SMS notifications
- [ ] Live vehicle tracking
- [ ] Multi-language support (i18n)
- [ ] PWA capabilities
- [ ] Backend API integration
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_GOOGLE_MAPS_KEY=your_maps_key
```

## Deployment

The app is optimized for deployment on:
- Vercel
- Netlify
- AWS Amplify
- Traditional web servers

## License

This project is proprietary and confidential.

## Support

For support, email support@monstraccarrent.com or visit our help center.