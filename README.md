# Monstrac CarRent - Premium Car Rental Portal

A world-class car rental portal built with React, TypeScript, and Tailwind CSS featuring a dark theme, 3D animations, and enterprise-grade UI components.

## 🚀 Features

### 🎨 Design & UI
- **Dark Theme**: Modern dark mode with neon accents and high contrast
- **3D Animations**: Interactive 3D car models using Three.js/React Three Fiber
- **Responsive Design**: Mobile-first approach with desktop, tablet, and mobile support
- **Smooth Animations**: Framer Motion powered micro-interactions and transitions
- **Glass Morphism**: Backdrop blur effects and translucent elements

### 🏠 Homepage Sections
- **Hero Banner**: 3D car scene with interactive elements
- **Booking Form**: Advanced search with filters and real-time validation
- **Categories**: Car type tiles with hover animations
- **Featured Cars**: Carousel with 3D flip effects and quick booking
- **How It Works**: 3-step animated process flow
- **Advantages**: Trust badges and feature highlights
- **Testimonials**: Customer reviews with rating system
- **FAQ**: Collapsible questions and answers
- **CTA Section**: Referral program and promotional offers

### 🚗 Car Management
- **Car Catalog**: Grid/list view with advanced filtering
- **Search & Filters**: Real-time search with multiple filter options
- **Car Details**: 3D viewer, specifications, and booking widget
- **Availability Calendar**: Real-time availability checking
- **Pricing Engine**: Dynamic pricing with add-ons and discounts

### 👤 User Management
- **Authentication**: Login/signup with social login options
- **Customer Dashboard**: Bookings, wallet, referrals, profile
- **Admin Dashboard**: Car management, driver management, analytics
- **Role-based Access**: Customer, Owner, and Admin roles

### 💳 Payment & Booking
- **Payment Integration**: Stripe, Razorpay, PayPal support
- **Booking Flow**: Complete reservation process
- **Notifications**: Email, SMS, and WhatsApp integration
- **Invoice Generation**: PDF receipts and booking confirmations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics
- **Three.js** - 3D library
- **React Router** - Client-side routing
- **Headless UI** - Accessible components

### Backend (Planned)
- **Node.js/Express** - Server framework
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Elasticsearch** - Search engine
- **AWS S3** - File storage

### Services
- **Stripe/Razorpay** - Payment processing
- **Twilio** - SMS and WhatsApp
- **SendGrid** - Email service
- **Google Maps** - Location services

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/monstrac-carrent.git
   cd monstrac-carrent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── sections/        # Homepage sections
│   ├── CarCard.tsx      # Car display component
│   ├── FilterPanel.tsx  # Search filters
│   └── Navigation.tsx   # Main navigation
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   ├── CarsPage.tsx     # Car catalog
│   ├── CarDetailPage.tsx # Individual car page
│   ├── AboutPage.tsx    # About us
│   ├── ContactPage.tsx  # Contact form
│   ├── LoginPage.tsx    # User login
│   ├── SignupPage.tsx   # User registration
│   ├── CustomerDashboard.tsx # Customer panel
│   └── AdminDashboard.tsx    # Admin panel
├── App.tsx              # Main app component
├── index.tsx            # Entry point
└── index.css            # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Neon Blue (#00d4ff)
- **Secondary**: Neon Purple (#8b5cf6)
- **Success**: Neon Green (#10b981)
- **Warning**: Neon Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Dark Backgrounds**: Charcoal (#0f172a) to Dark Gray (#1e293b)

### Typography
- **Primary Font**: Inter (UI text)
- **Display Font**: Montserrat (Headings)
- **Sizes**: Responsive scale from 0.875rem to 4rem

### Components
- **Buttons**: Gradient primary, outline secondary, ghost variants
- **Cards**: Glass morphism with subtle borders
- **Forms**: Dark inputs with neon focus states
- **Modals**: Backdrop blur with smooth animations

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_TWILIO_ACCOUNT_SID=your_twilio_sid
REACT_APP_SENDGRID_API_KEY=your_sendgrid_key
```

### Tailwind Configuration
The project uses a custom Tailwind config with:
- Dark theme colors
- Custom animations
- Neon glow effects
- Glass morphism utilities

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🎯 Features Implementation Status

### ✅ Completed
- [x] Project setup and configuration
- [x] Dark theme design system
- [x] Homepage with all sections
- [x] Car catalog with filters
- [x] Authentication pages
- [x] Responsive navigation
- [x] Component library
- [x] Animation system

### 🚧 In Progress
- [ ] Car detail page with 3D viewer
- [ ] Booking flow implementation
- [ ] Payment integration
- [ ] Dashboard pages
- [ ] API integration
- [ ] Notification system

### 📋 Planned
- [ ] Admin car management
- [ ] Driver management
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] PWA features
- [ ] Testing suite
- [ ] Performance optimization

## 🧪 Testing

### Unit Tests
```bash
npm test
# or
yarn test
```

### E2E Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `build`
3. Set environment variables

### AWS/Docker
```bash
# Build Docker image
docker build -t monstrac-carrent .

# Run container
docker run -p 3000:3000 monstrac-carrent
```

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Optimization Features
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis
- Caching strategies

## 🔒 Security

### Implemented
- Input validation
- XSS protection
- CSRF tokens
- Secure headers
- Environment variable protection

### Planned
- Rate limiting
- API authentication
- Data encryption
- Audit logging

## 🌐 Internationalization

### Supported Languages
- English (default)
- Spanish (planned)
- French (planned)
- German (planned)

### Currency Support
- USD (default)
- EUR
- GBP
- CAD
- AUD

## 📈 Analytics

### Tracking
- Google Analytics 4
- Custom event tracking
- User behavior analysis
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS
- **React Three Fiber** - React Three.js integration
- **Heroicons** - Beautiful SVG icons

## 📞 Support

- **Email**: support@monstrac.com
- **Documentation**: [docs.monstrac.com](https://docs.monstrac.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/monstrac-carrent/issues)

## 🎉 Demo

Live demo: [monstrac-carrent.vercel.app](https://monstrac-carrent.vercel.app)

---

**Built with ❤️ by the Monstrac Team**