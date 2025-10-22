# API Documentation - Monstrac CarRent

This document outlines the API endpoints required for the backend integration of the Monstrac CarRent application.

## Base URL
```
https://api.monstrac.com/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "password": "securePassword123",
  "role": "customer" // or "owner"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer",
      "walletBalance": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer",
      "walletBalance": 1500
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/logout
Logout the current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

## Cars Endpoints

### GET /cars
Get list of cars with filters.

**Query Parameters:**
- `category` (string): Filter by category (hatchback, sedan, suv, luxury, electric, vans)
- `priceMin` (number): Minimum price per day
- `priceMax` (number): Maximum price per day
- `seats` (number): Minimum number of seats
- `transmission` (string): Automatic or Manual
- `fuelType` (string): Petrol, Diesel, Electric
- `available` (boolean): Show only available cars
- `location` (string): Filter by location
- `from` (date): Availability from date
- `to` (date): Availability to date
- `sort` (string): Sort by (price-asc, price-desc, rating, popular)
- `page` (number): Page number for pagination
- `limit` (number): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "cars": [
      {
        "id": "car_123",
        "title": "Tesla Model 3 Performance",
        "brand": "Tesla",
        "model": "Model 3",
        "year": 2024,
        "image": "https://cdn.monstrac.com/cars/tesla-model-3.jpg",
        "images": ["url1", "url2", "url3"],
        "category": "electric",
        "pricePerDay": 120,
        "pricePerHour": 15,
        "pricePerWeek": 750,
        "seats": 5,
        "transmission": "Automatic",
        "fuelType": "Electric",
        "rating": 4.9,
        "reviews": 234,
        "features": ["Autopilot", "Premium Sound", "GPS"],
        "deposit": 500,
        "mileagePerDay": 200,
        "extraKmCharge": 0.5,
        "color": "Pearl White",
        "registration": "TES-2024-001",
        "available": true
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 10,
      "totalPages": 15
    }
  }
}
```

### GET /cars/:id
Get details of a specific car.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "car_123",
    "title": "Tesla Model 3 Performance",
    "brand": "Tesla",
    "model": "Model 3",
    "year": 2024,
    "description": "Experience the future of driving...",
    "image": "https://cdn.monstrac.com/cars/tesla-model-3.jpg",
    "images": ["url1", "url2", "url3"],
    "category": "electric",
    "pricePerDay": 120,
    "pricePerHour": 15,
    "pricePerWeek": 750,
    "seats": 5,
    "transmission": "Automatic",
    "fuelType": "Electric",
    "rating": 4.9,
    "reviews": 234,
    "features": ["Autopilot", "Premium Sound", "GPS Navigation"],
    "deposit": 500,
    "mileagePerDay": 200,
    "extraKmCharge": 0.5,
    "color": "Pearl White",
    "registration": "TES-2024-001",
    "vin": "5YJ3E1EA9KF123456",
    "available": true,
    "owner": {
      "id": "usr_456",
      "name": "Monstrac Fleet"
    },
    "unavailableDates": ["2024-10-25", "2024-10-26"]
  }
}
```

### POST /cars (Admin Only)
Add a new car to the fleet.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "BMW X5 M Sport",
  "brand": "BMW",
  "model": "X5",
  "year": 2023,
  "description": "Luxury SUV with powerful performance",
  "category": "luxury",
  "pricePerDay": 200,
  "pricePerHour": 25,
  "pricePerWeek": 1300,
  "seats": 7,
  "transmission": "Automatic",
  "fuelType": "Diesel",
  "features": ["Leather Seats", "Panoramic Roof", "Advanced Safety"],
  "deposit": 800,
  "mileagePerDay": 150,
  "extraKmCharge": 0.8,
  "color": "Black Sapphire",
  "registration": "BMW-2023-X5",
  "vin": "WBAKN6C50ED123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "car_789",
    "title": "BMW X5 M Sport",
    ...
  },
  "message": "Car added successfully"
}
```

### PUT /cars/:id (Admin Only)
Update car details.

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as POST /cars, all fields optional)

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Car updated successfully"
}
```

### DELETE /cars/:id (Admin Only)
Delete a car from the fleet.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Car deleted successfully"
}
```

---

## Bookings Endpoints

### GET /bookings
Get user's bookings (or all bookings for admin).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (string): active, completed, cancelled
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "bk_123",
        "userId": "usr_123",
        "carId": "car_123",
        "car": {
          "id": "car_123",
          "title": "Tesla Model 3",
          "image": "url"
        },
        "pickupDate": "2024-10-25T10:00:00Z",
        "returnDate": "2024-10-28T10:00:00Z",
        "pickupLocation": "Mumbai - BKC",
        "dropoffLocation": "Mumbai - BKC",
        "withDriver": false,
        "addons": {
          "insurance": true,
          "gps": false
        },
        "pricing": {
          "days": 3,
          "basePrice": 3600,
          "addons": 0,
          "taxes": 648,
          "deposit": 500,
          "total": 4248
        },
        "status": "confirmed",
        "paymentId": "pay_456",
        "createdAt": "2024-10-20T14:30:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

### GET /bookings/:id
Get specific booking details.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "bk_123",
    "userId": "usr_123",
    "carId": "car_123",
    ...
  }
}
```

### POST /bookings
Create a new booking.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "carId": "car_123",
  "pickupDate": "2024-10-25T10:00:00Z",
  "returnDate": "2024-10-28T10:00:00Z",
  "pickupLocation": "Mumbai - BKC",
  "dropoffLocation": "Mumbai - BKC",
  "withDriver": false,
  "addons": {
    "insurance": true,
    "gps": false,
    "childSeat": false
  },
  "promoCode": "FIRST25"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "bk_123",
      ...
    },
    "paymentIntent": {
      "clientSecret": "pi_secret_123",
      "amount": 4248
    }
  },
  "message": "Booking created successfully"
}
```

### PUT /bookings/:id
Update booking (e.g., extend rental).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "returnDate": "2024-10-30T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Booking updated successfully"
}
```

### DELETE /bookings/:id
Cancel a booking.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "refundAmount": 3600,
    "cancellationFee": 648
  },
  "message": "Booking cancelled successfully"
}
```

---

## User Endpoints

### GET /users/profile
Get current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "role": "customer",
    "walletBalance": 1500,
    "verified": true,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### PUT /users/profile
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated Doe",
  "phone": "+91 98765 00000"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Profile updated successfully"
}
```

### GET /users/wallet
Get wallet transactions.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 1500,
    "transactions": [
      {
        "id": "txn_123",
        "type": "credit",
        "amount": 500,
        "description": "Referral bonus",
        "date": "2024-10-20T14:30:00Z"
      }
    ]
  }
}
```

### POST /users/wallet/add-funds
Add funds to wallet.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 1000,
  "paymentMethodId": "pm_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "newBalance": 2500,
    "transactionId": "txn_456"
  },
  "message": "Funds added successfully"
}
```

---

## Payment Endpoints

### POST /payments/create-intent
Create a payment intent.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookingId": "bk_123",
  "amount": 4248
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_secret_123",
    "publishableKey": "pk_test_123"
  }
}
```

### POST /payments/confirm
Confirm a payment.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "paymentIntentId": "pi_123",
  "bookingId": "bk_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_456",
    "status": "succeeded"
  },
  "message": "Payment confirmed successfully"
}
```

### POST /payments/webhook
Webhook for payment provider callbacks.

**Request Body:** (Provider-specific format)

**Response:**
```json
{
  "success": true
}
```

---

## Admin Endpoints

### GET /admin/dashboard/stats
Get dashboard statistics.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 245000,
    "totalBookings": 156,
    "activeCars": 48,
    "activeDrivers": 32,
    "revenueChange": 12,
    "bookingsChange": 23
  }
}
```

### GET /admin/drivers
Get all drivers.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "drivers": [
      {
        "id": "drv_123",
        "name": "Rajesh Kumar",
        "phone": "+91 98765 11111",
        "licenseNo": "DL1234567890",
        "rating": 4.8,
        "totalTrips": 245,
        "status": "active",
        "verified": true
      }
    ]
  }
}
```

### POST /admin/drivers
Add a new driver.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Amit Singh",
  "phone": "+91 98765 22222",
  "licenseNo": "DL0987654321",
  "licenseExpiry": "2028-12-31",
  "documents": {
    "license": "doc_url",
    "aadhar": "doc_url"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Driver added successfully"
}
```

---

## Notifications Endpoints

### POST /notifications/send
Send notification (email/SMS/WhatsApp).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "userId": "usr_123",
  "type": "booking_confirmation",
  "channel": "whatsapp",
  "data": {
    "bookingId": "bk_123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification sent successfully"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email"
    }
  }
}
```

### Common Error Codes:
- `VALIDATION_ERROR` - Invalid input data
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (e.g., car already booked)
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

- Standard users: 100 requests per 15 minutes
- Admin users: 1000 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800
```

---

## Webhook Events

The following events can be sent to your webhook endpoint:

- `booking.created`
- `booking.confirmed`
- `booking.cancelled`
- `payment.succeeded`
- `payment.failed`
- `car.unavailable`
- `driver.assigned`

Configure webhook URL in admin dashboard.
