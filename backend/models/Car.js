const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a car name'],
    trim: true,
    maxlength: [100, 'Car name cannot be more than 100 characters']
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide a model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide a year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['economy', 'compact', 'midsize', 'fullsize', 'luxury', 'suv', 'convertible', 'electric', 'hybrid']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    isPrimary: { type: Boolean, default: false }
  }],
  specifications: {
    engine: String,
    horsepower: Number,
    torque: Number,
    acceleration: Number, // 0-60 mph in seconds
    topSpeed: Number,
    fuelCapacity: Number,
    cargoSpace: Number,
    towingCapacity: Number,
    safetyRating: { type: Number, min: 1, max: 5 },
    fuelType: {
      type: String,
      enum: ['gasoline', 'diesel', 'electric', 'hybrid']
    },
    transmission: {
      type: String,
      enum: ['manual', 'automatic', 'cvt', 'semi-automatic']
    },
    drivetrain: {
      type: String,
      enum: ['fwd', 'rwd', 'awd', '4wd']
    },
    seats: {
      type: Number,
      min: [1, 'Car must have at least 1 seat'],
      max: [9, 'Car cannot have more than 9 seats']
    },
    doors: {
      type: Number,
      min: [2, 'Car must have at least 2 doors'],
      max: [5, 'Car cannot have more than 5 doors']
    }
  },
  features: [{
    type: String,
    trim: true
  }],
  location: {
    name: {
      type: String,
      required: [true, 'Please provide a location name']
    },
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
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance', 'unavailable'],
    default: 'available'
  },
  mileage: {
    type: Number,
    required: [true, 'Please provide mileage'],
    min: [0, 'Mileage cannot be negative']
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  availability: {
    startDate: Date,
    endDate: Date,
    isAvailable: { type: Boolean, default: true }
  },
  pricing: {
    daily: { type: Number, required: true },
    weekly: Number,
    monthly: Number,
    weekend: Number,
    holiday: Number
  },
  insurance: {
    required: { type: Boolean, default: true },
    minimumAge: { type: Number, default: 21 },
    maximumAge: { type: Number, default: 75 },
    additionalDriverFee: { type: Number, default: 10 }
  },
  maintenance: {
    lastService: Date,
    nextService: Date,
    serviceHistory: [{
      date: Date,
      type: String,
      description: String,
      cost: Number
    }]
  },
  statistics: {
    totalRentals: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    averageRentalDuration: { type: Number, default: 0 },
    lastRented: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
carSchema.index({ name: 'text', brand: 'text', model: 'text', description: 'text' });
carSchema.index({ category: 1, price: 1, status: 1 });
carSchema.index({ 'location.coordinates': '2dsphere' });

// Virtual for full car name
carSchema.virtual('fullName').get(function() {
  return `${this.brand} ${this.model} ${this.year}`;
});

// Method to check availability
carSchema.methods.isAvailableForDates = function(startDate, endDate) {
  if (this.status !== 'available') return false;
  if (!this.availability.isAvailable) return false;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (this.availability.startDate && start < this.availability.startDate) return false;
  if (this.availability.endDate && end > this.availability.endDate) return false;
  
  return true;
};

// Method to calculate rental price
carSchema.methods.calculatePrice = function(startDate, endDate, pricingType = 'daily') {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  let basePrice = this.pricing[pricingType] || this.pricing.daily;
  
  // Apply weekend/holiday pricing if applicable
  const isWeekend = start.getDay() === 0 || start.getDay() === 6;
  if (isWeekend && this.pricing.weekend) {
    basePrice = this.pricing.weekend;
  }
  
  return basePrice * days;
};

// Method to update rating
carSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Car', carSchema);