const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@monstrac.com',
    password: 'admin123',
    phone: '+1 (555) 000-0000',
    licenseNumber: 'ADMIN123456',
    dateOfBirth: '1985-01-01',
    role: 'admin',
    address: {
      street: '123 Admin Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '+1 (555) 123-4567',
    licenseNumber: 'DL123456789',
    dateOfBirth: '1990-05-15',
    role: 'customer',
    address: {
      street: '456 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone: '+1 (555) 987-6543',
    licenseNumber: 'DL987654321',
    dateOfBirth: '1988-08-22',
    role: 'customer',
    address: {
      street: '789 Oak Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

const sampleCars = [
  {
    name: 'BMW X5 xDrive40i',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    category: 'suv',
    price: 150,
    originalPrice: 180,
    description: 'The BMW X5 xDrive40i combines luxury, performance, and versatility in one impressive package. With its powerful turbocharged engine, advanced all-wheel drive system, and premium interior, this SUV delivers an exceptional driving experience.',
    images: [
      { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', isPrimary: false }
    ],
    specifications: {
      engine: '3.0L TwinPower Turbo I6',
      horsepower: 335,
      torque: 330,
      acceleration: 5.3,
      topSpeed: 155,
      fuelCapacity: 21.9,
      cargoSpace: 33.9,
      towingCapacity: 7200,
      safetyRating: 5,
      fuelType: 'gasoline',
      transmission: 'automatic',
      drivetrain: 'awd',
      seats: 5,
      doors: 5
    },
    features: [
      'GPS Navigation',
      'Bluetooth Connectivity',
      'Backup Camera',
      'Leather Seats',
      'Sunroof',
      'Heated Seats',
      'Cruise Control',
      'Lane Departure Warning',
      'Blind Spot Monitoring',
      'Adaptive Cruise Control'
    ],
    location: {
      name: 'Downtown Office',
      address: {
        street: '123 Business District',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      coordinates: {
        latitude: 40.7589,
        longitude: -73.9851
      }
    },
    status: 'available',
    mileage: 15000,
    rating: {
      average: 4.8,
      count: 127
    },
    pricing: {
      daily: 150,
      weekly: 900,
      monthly: 3000,
      weekend: 180,
      holiday: 200
    }
  },
  {
    name: 'Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    category: 'electric',
    price: 160,
    description: 'The Tesla Model 3 is a revolutionary electric vehicle that combines cutting-edge technology with exceptional performance. Experience the future of driving with instant acceleration, autopilot features, and zero emissions.',
    images: [
      { url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', isPrimary: false }
    ],
    specifications: {
      engine: 'Electric Motor',
      horsepower: 283,
      torque: 307,
      acceleration: 4.2,
      topSpeed: 140,
      fuelCapacity: 75, // kWh
      cargoSpace: 15,
      towingCapacity: 0,
      safetyRating: 5,
      fuelType: 'electric',
      transmission: 'automatic',
      drivetrain: 'rwd',
      seats: 5,
      doors: 4
    },
    features: [
      'Autopilot',
      'Supercharging',
      'Premium Audio',
      'Glass Roof',
      'Over-the-Air Updates',
      'Mobile App Control',
      'Keyless Entry',
      'Premium Interior',
      'Navigation',
      'Bluetooth'
    ],
    location: {
      name: 'Airport Terminal',
      address: {
        street: '456 Airport Boulevard',
        city: 'New York',
        state: 'NY',
        zipCode: '11430',
        country: 'USA'
      },
      coordinates: {
        latitude: 40.6413,
        longitude: -73.7781
      }
    },
    status: 'available',
    mileage: 22000,
    rating: {
      average: 4.9,
      count: 89
    },
    pricing: {
      daily: 160,
      weekly: 1000,
      monthly: 3500,
      weekend: 190,
      holiday: 220
    }
  },
  {
    name: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    category: 'luxury',
    price: 140,
    description: 'The Mercedes-Benz C-Class represents the perfect blend of luxury and performance. With its elegant design, advanced technology, and refined driving dynamics, it offers an unparalleled premium experience.',
    images: [
      { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', isPrimary: false }
    ],
    specifications: {
      engine: '2.0L Turbo I4',
      horsepower: 255,
      torque: 295,
      acceleration: 5.9,
      topSpeed: 155,
      fuelCapacity: 17.4,
      cargoSpace: 12.6,
      towingCapacity: 0,
      safetyRating: 5,
      fuelType: 'gasoline',
      transmission: 'automatic',
      drivetrain: 'rwd',
      seats: 5,
      doors: 4
    },
    features: [
      'MBUX Infotainment',
      'Leather Seats',
      'Panoramic Sunroof',
      'Burmester Audio',
      'Ambient Lighting',
      'Heated Seats',
      'Navigation',
      'Bluetooth',
      'Keyless Go',
      'Distronic'
    ],
    location: {
      name: 'City Center',
      address: {
        street: '789 Central Plaza',
        city: 'New York',
        state: 'NY',
        zipCode: '10018',
        country: 'USA'
      },
      coordinates: {
        latitude: 40.7505,
        longitude: -73.9934
      }
    },
    status: 'available',
    mileage: 12000,
    rating: {
      average: 4.7,
      count: 95
    },
    pricing: {
      daily: 140,
      weekly: 850,
      monthly: 2800,
      weekend: 170,
      holiday: 190
    }
  },
  {
    name: 'Honda Civic',
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    category: 'compact',
    price: 80,
    description: 'The Honda Civic is the perfect choice for city driving and daily commutes. With its fuel-efficient engine, comfortable interior, and reliable performance, it offers excellent value for money.',
    images: [
      { url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', isPrimary: false }
    ],
    specifications: {
      engine: '1.5L Turbo I4',
      horsepower: 180,
      torque: 177,
      acceleration: 7.5,
      topSpeed: 125,
      fuelCapacity: 12.4,
      cargoSpace: 15.1,
      towingCapacity: 0,
      safetyRating: 5,
      fuelType: 'gasoline',
      transmission: 'cvt',
      drivetrain: 'fwd',
      seats: 5,
      doors: 4
    },
    features: [
      'Honda Sensing',
      'Apple CarPlay',
      'Android Auto',
      'Bluetooth',
      'Backup Camera',
      'Keyless Entry',
      'Cruise Control',
      'Lane Keep Assist',
      'Collision Mitigation',
      'Road Departure Mitigation'
    ],
    location: {
      name: 'Downtown Office',
      address: {
        street: '123 Business District',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      coordinates: {
        latitude: 40.7589,
        longitude: -73.9851
      }
    },
    status: 'available',
    mileage: 8000,
    rating: {
      average: 4.5,
      count: 203
    },
    pricing: {
      daily: 80,
      weekly: 500,
      monthly: 1800,
      weekend: 95,
      holiday: 110
    }
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
      console.log(`Created user: ${user.name}`);
    }

    // Create cars
    const cars = [];
    for (const carData of sampleCars) {
      const car = new Car(carData);
      await car.save();
      cars.push(car);
      console.log(`Created car: ${car.name}`);
    }

    // Create sample bookings
    const sampleBookings = [
      {
        user: users[1]._id, // John Doe
        car: cars[0]._id, // BMW X5
        dates: {
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-18'),
          totalDays: 3
        },
        locations: {
          pickup: {
            name: 'Downtown Office',
            address: {
              street: '123 Business District',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            }
          },
          return: {
            name: 'Airport Terminal',
            address: {
              street: '456 Airport Boulevard',
              city: 'New York',
              state: 'NY',
              zipCode: '11430',
              country: 'USA'
            }
          }
        },
        pricing: {
          basePrice: 450,
          additionalFees: [],
          discounts: [],
          subtotal: 450,
          tax: 45,
          total: 495
        },
        drivers: {
          primary: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            licenseNumber: 'DL123456789',
            dateOfBirth: '1990-05-15'
          },
          additional: []
        },
        extras: [],
        insurance: {
          type: 'basic',
          cost: 25
        },
        payment: {
          method: 'credit_card',
          status: 'paid',
          amount: 495,
          currency: 'USD',
          paidAt: new Date('2024-01-10')
        },
        status: 'completed'
      }
    ];

    for (const bookingData of sampleBookings) {
      const booking = new Booking(bookingData);
      await booking.save();
      console.log(`Created booking: ${booking.bookingNumber}`);
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${cars.length} cars`);
    console.log(`Created ${sampleBookings.length} bookings`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();