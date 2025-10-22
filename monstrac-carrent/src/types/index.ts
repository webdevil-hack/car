export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'customer' | 'owner' | 'admin'
  avatar?: string
  verified: boolean
  walletBalance: number
  createdAt: Date
  updatedAt: Date
}

export interface Car {
  id: string
  ownerId: string
  title: string
  brand: string
  model: string
  year: number
  registrationNo: string
  vin?: string
  color: string
  seats: number
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  transmission: 'manual' | 'automatic'
  pricePerHour: number
  pricePerDay: number
  pricePerWeek: number
  extraKmCharge: number
  deposit: number
  mileageIncluded: number
  images: string[]
  model3D?: string
  features: CarFeature[]
  location: Location
  availability: AvailabilityRule[]
  status: 'active' | 'maintenance' | 'inactive'
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface CarFeature {
  id: string
  name: string
  icon: string
  included: boolean
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  latitude: number
  longitude: number
}

export interface AvailabilityRule {
  id: string
  carId: string
  startDate: Date
  endDate: Date
  available: boolean
  reason?: string
}

export interface Driver {
  id: string
  name: string
  phone: string
  email?: string
  licenseNo: string
  licenseExpiry: Date
  rating: number
  experience: number
  languages: string[]
  carIds: string[]
  verified: boolean
  avatar?: string
  pricePerHour: number
  pricePerDay: number
  availability: DriverAvailability[]
  createdAt: Date
  updatedAt: Date
}

export interface DriverAvailability {
  id: string
  driverId: string
  date: Date
  startTime: string
  endTime: string
  available: boolean
}

export interface Booking {
  id: string
  bookingId: string
  userId: string
  carId: string
  driverId?: string
  pickupDate: Date
  returnDate: Date
  pickupLocation: Location
  returnLocation?: Location
  status: BookingStatus
  totalPrice: number
  deposit: number
  addons: BookingAddon[]
  paymentId?: string
  paymentStatus: PaymentStatus
  notes?: string
  damageReport?: DamageReport
  createdAt: Date
  updatedAt: Date
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'

export interface BookingAddon {
  id: string
  name: string
  price: number
  quantity: number
  type: 'driver' | 'insurance' | 'equipment' | 'service'
}

export interface DamageReport {
  id: string
  bookingId: string
  description: string
  images: string[]
  estimatedCost: number
  status: 'reported' | 'assessed' | 'resolved'
  createdAt: Date
}

export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  gatewayResponse?: any
  createdAt: Date
  updatedAt: Date
}

export type PaymentMethod = 
  | 'card'
  | 'upi'
  | 'wallet'
  | 'bank_transfer'
  | 'cash'

export interface Review {
  id: string
  bookingId: string
  userId: string
  carId: string
  driverId?: string
  rating: number
  comment?: string
  images?: string[]
  response?: string
  createdAt: Date
  updatedAt: Date
}

export interface Referral {
  id: string
  referrerId: string
  refereeId?: string
  code: string
  status: 'pending' | 'completed' | 'expired'
  reward: number
  createdAt: Date
  completedAt?: Date
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: Date
}

export type NotificationType = 
  | 'booking_confirmed'
  | 'booking_reminder'
  | 'payment_success'
  | 'payment_failed'
  | 'review_request'
  | 'promotion'
  | 'system'

export interface SearchFilters {
  location?: string
  pickupDate?: Date
  returnDate?: Date
  carType?: string[]
  priceRange?: [number, number]
  seats?: number
  transmission?: string
  fuelType?: string
  features?: string[]
  rating?: number
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'popular'
}

export interface DashboardStats {
  totalBookings: number
  activeBookings: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  monthlyGrowth: number
}

export interface CarStats {
  totalCars: number
  activeCars: number
  maintenanceCars: number
  averageRating: number
  totalBookings: number
  revenue: number
}

export interface DriverStats {
  totalDrivers: number
  activeDrivers: number
  averageRating: number
  totalTrips: number
  revenue: number
}

export interface FinancialReport {
  period: string
  revenue: number
  expenses: number
  profit: number
  bookings: number
  averageBookingValue: number
  topPerformingCars: Car[]
  topPerformingDrivers: Driver[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FormState {
  loading: boolean
  error?: string
  success?: string
}