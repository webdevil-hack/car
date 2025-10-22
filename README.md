# 🚗 Monstrac CarRent - World-Class Car Rental Portal

A comprehensive, full-stack car rental platform built with React, Node.js, and MongoDB. Features a modern dark theme, 3D animations, complete booking system, admin dashboard, and payment integration.

## ✨ Features

### 🎨 Frontend Features
- **Modern Dark Theme** with neon accents and gradients
- **3D Animations** using Framer Motion and Three.js
- **Responsive Design** for desktop, tablet, and mobile
- **Interactive Car Gallery** with image zoom and navigation
- **Advanced Search & Filtering** with real-time results
- **User Authentication** with JWT tokens
- **Booking Management** with calendar integration
- **Payment Processing** with Stripe integration
- **Admin Dashboard** with analytics and management tools
- **Customer Dashboard** with booking history and preferences

### 🔧 Backend Features
- **RESTful API** with Express.js and Node.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Stripe Payment Integration** for secure transactions
- **Image Upload** with Cloudinary integration
- **Email Notifications** with Nodemailer
- **Rate Limiting** and security middleware
- **Comprehensive Validation** with Express Validator
- **Analytics & Reporting** for business insights

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Heroicons** for icons
- **Three.js** for 3D graphics
- **Stripe** for payments

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Stripe** for payment processing
- **Cloudinary** for image storage
- **Nodemailer** for email
- **Express Validator** for validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Stripe Account (for payments)
- Cloudinary Account (for images)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monstrac-carrent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend
   cp .env.example .env
   
   # Backend
   cp backend/.env.example backend/.env
   ```

4. **Configure environment variables**
   
   **Frontend (.env):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
   ```

   **Backend (backend/.env):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/monstrac-carrent
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```

5. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

6. **Seed the database** (optional)
   ```bash
   npm run server:seed
   ```

7. **Start the application**
   ```bash
   # Development (both frontend and backend)
   npm run dev
   
   # Or start separately
   npm run client  # Frontend only
   npm run server  # Backend only
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - API Health: http://localhost:5000/api/health

## 📱 Application Structure

```
monstrac-carrent/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── services/          # API service layer
│   └── styles/            # Global styles
├── backend/               # Backend Node.js application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── scripts/           # Database seeding scripts
└── public/                # Static assets
```

## 🔑 Default Admin Account

After seeding the database, you can login with:
- **Email**: admin@monstrac.com
- **Password**: admin123

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Cars
- `GET /api/cars` - Get all cars with filters
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update status (Admin)
- `POST /api/bookings/:id/cancel` - Cancel booking

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Detailed analytics

### Payments
- `POST /api/payments/create-payment-intent` - Create payment
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/refund` - Process refund

## 🎨 Design System

### Colors
- **Primary**: Dark theme with neon accents
- **Neon Blue**: #00D4FF
- **Neon Purple**: #8B5CF6
- **Neon Green**: #10B981
- **Neon Pink**: #EC4899

### Typography
- **Primary Font**: Inter
- **Secondary Font**: Montserrat

### Components
- Responsive grid layouts
- Animated cards and buttons
- Interactive forms with validation
- Status indicators and badges
- Loading states and skeletons

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Helmet security headers
- SQL injection protection

## 📈 Performance Optimizations

- React lazy loading
- Image optimization
- Code splitting
- Memoization for expensive operations
- Efficient database queries
- CDN for static assets

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend && npm test

# Run all tests
npm run test:all
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update MONGODB_URI in environment variables
3. Configure network access and database user

## 📝 Environment Variables

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |
| `EMAIL_HOST` | SMTP host | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/your-repo/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@monstrac.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Stripe](https://stripe.com/) - Payment processing
- [Cloudinary](https://cloudinary.com/) - Image management

## 🔄 Changelog

### v1.0.0 (2024-01-15)
- Initial release
- Complete frontend with React and TypeScript
- Backend API with Node.js and Express
- MongoDB database integration
- Stripe payment processing
- Admin and customer dashboards
- Responsive design with dark theme
- 3D animations and modern UI
- Comprehensive booking system
- Analytics and reporting features

---

**Built with ❤️ by the Monstrac Team**