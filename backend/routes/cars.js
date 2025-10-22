const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/cars
// @desc    Get all cars with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['economy', 'compact', 'midsize', 'fullsize', 'luxury', 'suv', 'convertible', 'electric', 'hybrid']),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('brand').optional().isString().trim(),
  query('transmission').optional().isIn(['manual', 'automatic', 'cvt', 'semi-automatic']),
  query('fuelType').optional().isIn(['gasoline', 'diesel', 'electric', 'hybrid']),
  query('seats').optional().isInt({ min: 1, max: 9 }),
  query('sortBy').optional().isIn(['price', 'rating', 'year', 'name', 'createdAt']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  query('search').optional().isString().trim()
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
      limit = 12,
      category,
      minPrice,
      maxPrice,
      brand,
      transmission,
      fuelType,
      seats,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      startDate,
      endDate
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (transmission) filter['specifications.transmission'] = transmission;
    if (fuelType) filter['specifications.fuelType'] = fuelType;
    if (seats) filter['specifications.seats'] = parseInt(seats);
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Check availability for specific dates
    if (startDate && endDate) {
      filter.status = 'available';
      filter['availability.isAvailable'] = true;
      // Additional availability check would be done in the application logic
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const cars = await Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-maintenance -statistics');

    const totalCars = await Car.countDocuments(filter);
    const totalPages = Math.ceil(totalCars / parseInt(limit));

    res.json({
      success: true,
      data: {
        cars,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCars,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/cars/:id
// @desc    Get single car by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      data: { car }
    });
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cars
// @desc    Create a new car (Admin only)
// @access  Private/Admin
router.post('/', auth, adminAuth, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Car name is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('model').trim().notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Invalid year'),
  body('category').isIn(['economy', 'compact', 'midsize', 'fullsize', 'luxury', 'suv', 'convertible', 'electric', 'hybrid']).withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('specifications.seats').isInt({ min: 1, max: 9 }).withMessage('Seats must be between 1 and 9'),
  body('specifications.fuelType').isIn(['gasoline', 'diesel', 'electric', 'hybrid']).withMessage('Invalid fuel type'),
  body('specifications.transmission').isIn(['manual', 'automatic', 'cvt', 'semi-automatic']).withMessage('Invalid transmission'),
  body('location.name').trim().notEmpty().withMessage('Location name is required')
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

    const carData = req.body;
    carData.addedBy = req.userId;

    const car = new Car(carData);
    await car.save();

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: { car }
    });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/cars/:id
// @desc    Update car (Admin only)
// @access  Private/Admin
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Car updated successfully',
      data: { car: updatedCar }
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete car (Admin only)
// @access  Private/Admin
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Soft delete by setting isActive to false
    car.isActive = false;
    await car.save();

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cars/:id/availability
// @desc    Check car availability for specific dates
// @access  Public
router.post('/:id/availability', [
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date')
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

    const { startDate, endDate } = req.body;
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const isAvailable = car.isAvailableForDates(startDate, endDate);
    const price = car.calculatePrice(startDate, endDate);

    res.json({
      success: true,
      data: {
        isAvailable,
        price,
        car: {
          id: car._id,
          name: car.name,
          price: car.price,
          images: car.images
        }
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/cars/categories
// @desc    Get all car categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Car.distinct('category');
    
    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/cars/brands
// @desc    Get all car brands
// @access  Public
router.get('/brands', async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    
    res.json({
      success: true,
      data: { brands }
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;