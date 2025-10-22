const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Booking must be for a car']
  },
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  dates: {
    startDate: {
      type: Date,
      required: [true, 'Please provide start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date']
    },
    totalDays: {
      type: Number,
      required: true
    }
  },
  locations: {
    pickup: {
      name: { type: String, required: true },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'USA' }
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    return: {
      name: { type: String, required: true },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'USA' }
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    }
  },
  pricing: {
    basePrice: { type: Number, required: true },
    additionalFees: [{
      name: String,
      amount: Number,
      description: String
    }],
    discounts: [{
      name: String,
      amount: Number,
      description: String
    }],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  drivers: {
    primary: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      licenseNumber: { type: String, required: true },
      dateOfBirth: { type: Date, required: true }
    },
    additional: [{
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      licenseNumber: { type: String, required: true },
      dateOfBirth: { type: Date, required: true }
    }]
  },
  extras: [{
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  insurance: {
    type: {
      type: String,
      enum: ['basic', 'premium', 'full'],
      required: true
    },
    provider: String,
    policyNumber: String,
    coverage: {
      liability: Number,
      collision: Number,
      comprehensive: Number
    },
    cost: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    transactionId: String,
    stripePaymentIntentId: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  notes: {
    customer: String,
    admin: String,
    internal: String
  },
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['customer', 'admin', 'system']
    },
    cancelledAt: Date,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    }
  },
  checkIn: {
    actualStartDate: Date,
    checkInLocation: String,
    checkInNotes: String,
    carCondition: {
      exterior: String,
      interior: String,
      fuelLevel: Number,
      mileage: Number
    },
    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  checkOut: {
    actualEndDate: Date,
    checkOutLocation: String,
    checkOutNotes: String,
    carCondition: {
      exterior: String,
      interior: String,
      fuelLevel: Number,
      mileage: Number
    },
    checkedOutBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  rating: {
    car: {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      submittedAt: Date
    },
    service: {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      submittedAt: Date
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ car: 1, 'dates.startDate': 1, 'dates.endDate': 1 });
bookingSchema.index({ bookingNumber: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to generate booking number
bookingSchema.pre('save', async function(next) {
  if (!this.bookingNumber) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingNumber = `MCR${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Method to check if booking is active
bookingSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'active' && 
         now >= this.dates.startDate && 
         now <= this.dates.endDate;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const hoursUntilStart = (this.dates.startDate - now) / (1000 * 60 * 60);
  
  return this.status === 'pending' || 
         this.status === 'confirmed' && hoursUntilStart > 24;
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefund = function() {
  if (!this.cancellation) return 0;
  
  const now = new Date();
  const hoursUntilStart = (this.dates.startDate - now) / (1000 * 60 * 60);
  
  if (hoursUntilStart > 48) {
    return this.pricing.total; // Full refund
  } else if (hoursUntilStart > 24) {
    return this.pricing.total * 0.5; // 50% refund
  } else {
    return 0; // No refund
  }
};

// Static method to check car availability
bookingSchema.statics.checkCarAvailability = async function(carId, startDate, endDate, excludeBookingId = null) {
  const query = {
    car: carId,
    status: { $in: ['confirmed', 'active'] },
    $or: [
      {
        'dates.startDate': { $lte: new Date(endDate) },
        'dates.endDate': { $gte: new Date(startDate) }
      }
    ]
  };
  
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  
  const conflictingBookings = await this.find(query);
  return conflictingBookings.length === 0;
};

module.exports = mongoose.model('Booking', bookingSchema);