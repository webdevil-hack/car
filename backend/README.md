# Monstrac CarRent Backend API

A comprehensive Node.js/Express backend API for the Monstrac CarRent portal with MongoDB database integration, JWT authentication, and Stripe payment processing.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Car Management**: Full CRUD operations for car fleet management
- **Booking System**: Complete booking lifecycle with status tracking
- **User Management**: Customer and admin user management
- **Payment Processing**: Stripe integration for secure payments
- **Analytics**: Comprehensive business analytics and reporting
- **Image Upload**: Cloudinary integration for car images
- **Email Notifications**: Automated email notifications
- **Rate Limiting**: API rate limiting for security
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Centralized error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe
- **Image Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Stripe Account
- Cloudinary Account (optional)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/monstrac-carrent
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | User login | Public |
| GET | `/auth/me` | Get current user | Private |
| PUT | `/auth/profile` | Update profile | Private |
| POST | `/auth/change-password` | Change password | Private |
| POST | `/auth/logout` | User logout | Private |

### Cars Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/cars` | Get all cars with filters | Public |
| GET | `/cars/:id` | Get single car | Public |
| POST | `/cars` | Create new car | Admin |
| PUT | `/cars/:id` | Update car | Admin |
| DELETE | `/cars/:id` | Delete car | Admin |
| POST | `/cars/:id/availability` | Check availability | Public |
| GET | `/cars/categories` | Get car categories | Public |
| GET | `/cars/brands` | Get car brands | Public |

### Bookings Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/bookings` | Get user bookings | Private |
| GET | `/bookings/:id` | Get single booking | Private |
| POST | `/bookings` | Create new booking | Private |
| PUT | `/bookings/:id/status` | Update booking status | Admin |
| POST | `/bookings/:id/cancel` | Cancel booking | Private |
| POST | `/bookings/:id/rate` | Rate booking | Private |

### Users Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get single user | Private |
| PUT | `/users/:id` | Update user | Private/Admin |
| DELETE | `/users/:id` | Delete user | Admin |
| GET | `/users/:id/bookings` | Get user bookings | Private |
| GET | `/users/:id/stats` | Get user statistics | Private |

### Admin Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/admin/dashboard` | Get dashboard stats | Admin |
| GET | `/admin/analytics` | Get detailed analytics | Admin |

### Payment Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/payments/create-payment-intent` | Create payment intent | Private |
| POST | `/payments/confirm-payment` | Confirm payment | Private |
| POST | `/payments/refund` | Process refund | Private |
| GET | `/payments/methods` | Get payment methods | Public |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRE` | JWT expiration time | No | 7d |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | - |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No | - |
| `EMAIL_HOST` | SMTP host | No | - |
| `EMAIL_PORT` | SMTP port | No | 587 |
| `EMAIL_USER` | SMTP username | No | - |
| `EMAIL_PASS` | SMTP password | No | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

## 🗄️ Database Schema

### User Model
- Personal information (name, email, phone, address)
- Authentication (password, JWT tokens)
- Preferences (notifications, currency, language)
- Statistics (loyalty points, total bookings, total spent)
- Role-based access control

### Car Model
- Basic info (name, brand, model, year, category)
- Pricing (daily, weekly, monthly rates)
- Specifications (engine, horsepower, features)
- Location and availability
- Images and ratings
- Maintenance records

### Booking Model
- User and car references
- Dates and locations
- Pricing breakdown
- Driver information
- Payment details
- Status tracking
- Reviews and ratings

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Comprehensive input validation
- **SQL Injection Protection**: Mongoose ODM protection
- **XSS Protection**: Input sanitization

## 📊 Monitoring & Logging

- **Morgan**: HTTP request logging
- **Error Handling**: Centralized error handling
- **Health Check**: `/api/health` endpoint
- **Environment Detection**: Development vs production

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Using PM2
```bash
npm install -g pm2
pm2 start server.js --name "monstrac-api"
pm2 save
pm2 startup
```

### Using Docker
```bash
# Build image
docker build -t monstrac-api .

# Run container
docker run -p 5000:5000 --env-file .env monstrac-api
```

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Set up Stripe webhooks
4. Configure Cloudinary (optional)
5. Set up email service (optional)

## 📝 API Usage Examples

### Register User
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    licenseNumber: 'DL123456789',
    dateOfBirth: '1990-01-01'
  })
});
```

### Get Cars with Filters
```javascript
const response = await fetch('/api/cars?category=suv&minPrice=100&maxPrice=200&page=1&limit=10');
const data = await response.json();
```

### Create Booking
```javascript
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    car: 'carId',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    pickupLocation: { name: 'Downtown Office', address: {...} },
    returnLocation: { name: 'Airport Terminal', address: {...} },
    drivers: { primary: {...} },
    insurance: { type: 'basic' },
    payment: { method: 'credit_card' }
  })
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@monstrac.com or create an issue in the repository.

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete API implementation
- Authentication system
- Car management
- Booking system
- Payment integration
- Admin dashboard
- Analytics and reporting