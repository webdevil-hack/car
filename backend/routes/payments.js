const express = require('express');
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post('/create-payment-intent', auth, [
  body('bookingId').isMongoId().withMessage('Valid booking ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number')
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

    const { bookingId, amount } = req.body;

    // Get booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: bookingId,
        userId: req.userId
      }
    });

    // Update booking with payment intent ID
    booking.payment.stripePaymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments/confirm-payment
// @desc    Confirm payment and update booking
// @access  Private
router.post('/confirm-payment', auth, [
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('bookingId').isMongoId().withMessage('Valid booking ID is required')
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

    const { paymentIntentId, bookingId } = req.body;

    // Get payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    // Get booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update booking payment status
    booking.payment.status = 'paid';
    booking.payment.paidAt = new Date();
    booking.payment.transactionId = paymentIntent.id;
    booking.status = 'confirmed';

    await booking.save();

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments/refund
// @desc    Process refund for cancelled booking
// @access  Private
router.post('/refund', auth, [
  body('bookingId').isMongoId().withMessage('Valid booking ID is required'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number')
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

    const { bookingId, amount } = req.body;

    // Get booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking has a payment intent
    if (!booking.payment.stripePaymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'No payment found for this booking'
      });
    }

    // Calculate refund amount
    const refundAmount = amount || booking.pricing.total;

    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: booking.payment.stripePaymentIntentId,
      amount: Math.round(refundAmount * 100) // Convert to cents
    });

    // Update booking
    booking.payment.status = 'refunded';
    booking.payment.refundedAt = new Date();
    booking.payment.refundAmount = refundAmount;
    booking.cancellation.refundStatus = 'processed';

    await booking.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        amount: refundAmount
      }
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payments/methods
// @desc    Get available payment methods
// @access  Public
router.get('/methods', (req, res) => {
  res.json({
    success: true,
    data: {
      methods: [
        {
          id: 'credit_card',
          name: 'Credit Card',
          description: 'Visa, Mastercard, American Express',
          enabled: true
        },
        {
          id: 'debit_card',
          name: 'Debit Card',
          description: 'Visa, Mastercard Debit',
          enabled: true
        },
        {
          id: 'paypal',
          name: 'PayPal',
          description: 'Pay with your PayPal account',
          enabled: false
        },
        {
          id: 'apple_pay',
          name: 'Apple Pay',
          description: 'Pay with Apple Pay',
          enabled: false
        },
        {
          id: 'google_pay',
          name: 'Google Pay',
          description: 'Pay with Google Pay',
          enabled: false
        }
      ]
    }
  });
});

// @route   POST /api/payments/webhook
// @desc    Stripe webhook handler
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      handlePaymentFailed(event.data.object);
      break;
    case 'charge.dispute.created':
      handleDisputeCreated(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Webhook handlers
async function handlePaymentSucceeded(paymentIntent) {
  try {
    const booking = await Booking.findOne({
      'payment.stripePaymentIntentId': paymentIntent.id
    });

    if (booking) {
      booking.payment.status = 'paid';
      booking.payment.paidAt = new Date();
      booking.status = 'confirmed';
      await booking.save();
    }
  } catch (error) {
    console.error('Error handling payment succeeded:', error);
  }
}

async function handlePaymentFailed(paymentIntent) {
  try {
    const booking = await Booking.findOne({
      'payment.stripePaymentIntentId': paymentIntent.id
    });

    if (booking) {
      booking.payment.status = 'failed';
      await booking.save();
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleDisputeCreated(dispute) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(dispute.payment_intent);
    const booking = await Booking.findOne({
      'payment.stripePaymentIntentId': paymentIntent.id
    });

    if (booking) {
      // Handle dispute - notify admin, update booking status, etc.
      console.log('Dispute created for booking:', booking._id);
    }
  } catch (error) {
    console.error('Error handling dispute created:', error);
  }
}

module.exports = router;