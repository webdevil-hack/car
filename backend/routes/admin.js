const express = require('express');
const { body, query, validationResult } = require('express-validator');
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private/Admin
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Basic counts
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments({ isActive: true });
    const totalBookings = await Booking.countDocuments();

    // Revenue calculations
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    const monthlyRevenue = await Booking.aggregate([
      { 
        $match: { 
          status: 'completed',
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    const lastMonthRevenue = await Booking.aggregate([
      { 
        $match: { 
          status: 'completed',
          createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    // Active bookings
    const activeBookings = await Booking.countDocuments({ 
      status: { $in: ['confirmed', 'active'] }
    });

    // New users this month
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Car availability
    const availableCars = await Car.countDocuments({ 
      status: 'available',
      isActive: true
    });

    const rentedCars = await Car.countDocuments({ 
      status: 'rented',
      isActive: true
    });

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('car', 'name brand model')
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent users
    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate growth rates
    const revenueGrowth = lastMonthRevenue.length > 0 && monthlyRevenue.length > 0
      ? ((monthlyRevenue[0].total - lastMonthRevenue[0].total) / lastMonthRevenue[0].total) * 100
      : 0;

    const userGrowth = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });
    const userGrowthRate = userGrowth > 0
      ? ((newUsers - userGrowth) / userGrowth) * 100
      : 0;

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalCars,
          totalBookings,
          totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
          monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
          activeBookings,
          newUsers,
          availableCars,
          rentedCars
        },
        growth: {
          revenueGrowth: Math.round(revenueGrowth * 100) / 100,
          userGrowthRate: Math.round(userGrowthRate * 100) / 100
        },
        recent: {
          bookings: recentBookings,
          users: recentUsers
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Private/Admin
router.get('/analytics', auth, adminAuth, [
  query('period').optional().isIn(['7d', '30d', '90d', '1y']).withMessage('Invalid period'),
  query('type').optional().isIn(['revenue', 'bookings', 'users', 'cars']).withMessage('Invalid type')
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

    const { period = '30d', type = 'revenue' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    let analytics = {};

    switch (type) {
      case 'revenue':
        analytics = await getRevenueAnalytics(startDate, now);
        break;
      case 'bookings':
        analytics = await getBookingAnalytics(startDate, now);
        break;
      case 'users':
        analytics = await getUserAnalytics(startDate, now);
        break;
      case 'cars':
        analytics = await getCarAnalytics(startDate, now);
        break;
    }

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Helper functions for analytics
async function getRevenueAnalytics(startDate, endDate) {
  const dailyRevenue = await Booking.aggregate([
    {
      $match: {
        status: 'completed',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$pricing.total' },
        bookings: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0);
  const totalBookings = dailyRevenue.reduce((sum, day) => sum + day.bookings, 0);
  const averageOrderValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

  return {
    dailyRevenue,
    totalRevenue,
    totalBookings,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100
  };
}

async function getBookingAnalytics(startDate, endDate) {
  const statusCounts = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const dailyBookings = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return {
    statusCounts,
    dailyBookings
  };
}

async function getUserAnalytics(startDate, endDate) {
  const dailyUsers = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const totalUsers = dailyUsers.reduce((sum, day) => sum + day.count, 0);

  return {
    dailyUsers,
    totalUsers
  };
}

async function getCarAnalytics(startDate, endDate) {
  const carStatus = await Car.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const popularCars = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: '$car',
        bookings: { $sum: 1 },
        revenue: { $sum: '$pricing.total' }
      }
    },
    {
      $lookup: {
        from: 'cars',
        localField: '_id',
        foreignField: '_id',
        as: 'car'
      }
    },
    { $unwind: '$car' },
    {
      $project: {
        carName: '$car.name',
        carBrand: '$car.brand',
        bookings: 1,
        revenue: 1
      }
    },
    { $sort: { bookings: -1 } },
    { $limit: 10 }
  ]);

  return {
    carStatus,
    popularCars
  };
}

module.exports = router;