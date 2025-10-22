const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get user's bookings or all bookings (admin)
// @access  Private
router.get('/', auth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no-show']),
  query('sortBy').optional().isIn(['createdAt', 'startDate', 'endDate', 'total']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      filter.user = req.userId;
    }

    if (status) filter.status = status;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with population
    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('car', 'name brand model year images price')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalBookings = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalBookings / parseInt(limit));

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalBookings,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('car', 'name brand model year images price specifications');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can access this booking
    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, [
  body('car').isMongoId().withMessage('Valid car ID is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('pickupLocation').isObject().withMessage('Pickup location is required'),
  body('returnLocation').isObject().withMessage('Return location is required'),
  body('drivers.primary.name').trim().notEmpty().withMessage('Primary driver name is required'),
  body('drivers.primary.email').isEmail().withMessage('Primary driver email must be valid'),
  body('drivers.primary.phone').matches(/^\+?[\d\s\-\(\)]+$/).withMessage('Primary driver phone must be valid'),
  body('drivers.primary.licenseNumber').notEmpty().withMessage('Primary driver license number is required'),
  body('drivers.primary.dateOfBirth').isISO8601().withMessage('Primary driver date of birth must be valid'),
  body('insurance.type').isIn(['basic', 'premium', 'full']).withMessage('Invalid insurance type'),
  body('payment.method').isIn(['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      car: carId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      drivers,
      insurance,
      payment,
      extras = [],
      specialRequests
    } = req.body;

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check availability
    const isAvailable = await Booking.checkCarAvailability(carId, startDate, endDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Car is not available for the selected dates'
      });
    }

    // Calculate pricing
    const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const basePrice = car.calculatePrice(startDate, endDate);
    
    // Calculate additional fees
    const additionalFees = [];
    let subtotal = basePrice;

    // Additional driver fee
    if (drivers.additional && drivers.additional.length > 0) {
      const additionalDriverFee = car.insurance.additionalDriverFee * drivers.additional.length;
      additionalFees.push({
        name: 'Additional Drivers',
        amount: additionalDriverFee,
        description: `${drivers.additional.length} additional driver(s)`
      });
      subtotal += additionalDriverFee;
    }

    // Extras fees
    extras.forEach(extra => {
      additionalFees.push({
        name: extra.name,
        amount: extra.price * extra.quantity,
        description: extra.description
      });
      subtotal += extra.price * extra.quantity;
    });

    // Insurance cost
    const insuranceCost = insurance.type === 'basic' ? 25 : insurance.type === 'premium' ? 50 : 100;
    subtotal += insuranceCost;

    // Tax calculation (10%)
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Create booking
    const bookingData = {
      user: req.userId,
      car: carId,
      dates: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalDays
      },
      locations: {
        pickup: pickupLocation,
        return: returnLocation
      },
      pricing: {
        basePrice,
        additionalFees,
        discounts: [],
        subtotal,
        tax,
        total
      },
      drivers,
      extras,
      insurance: {
        ...insurance,
        cost: insuranceCost
      },
      payment: {
        ...payment,
        amount: total,
        status: 'pending'
      },
      specialRequests
    };

    const booking = new Booking(bookingData);
    await booking.save();

    // Populate the booking for response
    await booking.populate('car', 'name brand model year images price');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (Admin only)
// @access  Private/Admin
router.put('/:id/status', auth, adminAuth, [
  body('status').isIn(['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no-show']).withMessage('Invalid status'),
  body('notes').optional().isString().trim()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update status
    booking.status = status;
    if (notes) {
      booking.notes.admin = notes;
    }

    // Update timestamps based on status
    if (status === 'confirmed') {
      booking.payment.status = 'paid';
      booking.payment.paidAt = new Date();
    } else if (status === 'active') {
      booking.checkIn.actualStartDate = new Date();
    } else if (status === 'completed') {
      booking.checkOut.actualEndDate = new Date();
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.post('/:id/cancel', auth, [
  body('reason').optional().isString().trim()
], async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can cancel this booking
    if (req.user.role !== 'admin' && booking.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (!booking.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled at this time'
      });
    }

    // Calculate refund
    const refundAmount = booking.calculateRefund();

    // Update booking
    booking.status = 'cancelled';
    booking.cancellation = {
      reason,
      cancelledBy: req.user.role === 'admin' ? 'admin' : 'customer',
      cancelledAt: new Date(),
      refundAmount,
      refundStatus: refundAmount > 0 ? 'pending' : 'processed'
    };

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        booking,
        refundAmount
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings/:id/rate
// @desc    Rate a booking
// @access  Private
router.post('/:id/rate', auth, [
  body('carRating').isInt({ min: 1, max: 5 }).withMessage('Car rating must be between 1 and 5'),
  body('serviceRating').isInt({ min: 1, max: 5 }).withMessage('Service rating must be between 1 and 5'),
  body('carReview').optional().isString().trim(),
  body('serviceReview').optional().isString().trim()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { carRating, serviceRating, carReview, serviceReview } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can rate this booking
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed bookings'
      });
    }

    // Update booking rating
    booking.rating = {
      car: {
        rating: carRating,
        review: carReview,
        submittedAt: new Date()
      },
      service: {
        rating: serviceRating,
        review: serviceReview,
        submittedAt: new Date()
      }
    };

    await booking.save();

    // Update car rating
    const car = await Car.findById(booking.car);
    if (car) {
      await car.updateRating(carRating);
    }

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Rate booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;