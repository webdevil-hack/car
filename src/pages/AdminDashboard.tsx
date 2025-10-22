import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  rating: number;
  status: 'available' | 'rented' | 'maintenance' | 'unavailable';
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  features: string[];
  images: string[];
  createdAt: string;
  lastRented: string;
  totalRentals: number;
  totalRevenue: number;
}

interface Booking {
  id: string;
  carName: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  memberSince: string;
  totalBookings: number;
  totalSpent: number;
  lastLogin: string;
}

interface Analytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBookings: number;
  activeBookings: number;
  totalCars: number;
  availableCars: number;
  totalUsers: number;
  newUsers: number;
  averageRating: number;
  occupancyRate: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalRevenue: 125000,
    monthlyRevenue: 18500,
    totalBookings: 1247,
    activeBookings: 23,
    totalCars: 156,
    availableCars: 98,
    totalUsers: 2847,
    newUsers: 47,
    averageRating: 4.7,
    occupancyRate: 78.5
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setCars([
      {
        id: '1',
        name: 'BMW X5',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        category: 'SUV',
        price: 150,
        rating: 4.8,
        status: 'available',
        location: 'Downtown Office',
        mileage: 15000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        seats: 5,
        features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
        images: ['/api/placeholder/400/300'],
        createdAt: '2023-01-15',
        lastRented: '2024-01-10',
        totalRentals: 45,
        totalRevenue: 6750
      },
      {
        id: '2',
        name: 'Tesla Model 3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        category: 'Electric',
        price: 160,
        rating: 4.9,
        status: 'rented',
        location: 'Airport Terminal',
        mileage: 22000,
        fuelType: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        features: ['Autopilot', 'Supercharging', 'Premium Audio', 'Glass Roof'],
        images: ['/api/placeholder/400/300'],
        createdAt: '2023-02-20',
        lastRented: '2024-01-15',
        totalRentals: 38,
        totalRevenue: 6080
      }
    ]);

    setBookings([
      {
        id: '1',
        carName: 'BMW X5',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        totalDays: 5,
        totalPrice: 750,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        carName: 'Tesla Model 3',
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        startDate: '2024-01-18',
        endDate: '2024-01-22',
        totalDays: 4,
        totalPrice: 640,
        status: 'active',
        paymentStatus: 'paid',
        createdAt: '2024-01-10'
      }
    ]);

    setUsers([
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        memberSince: '2023-01-15',
        totalBookings: 12,
        totalSpent: 2450,
        lastLogin: '2024-01-15'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        status: 'active',
        memberSince: '2023-03-20',
        totalBookings: 8,
        totalSpent: 1890,
        lastLogin: '2024-01-14'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/20';
      case 'rented': return 'text-blue-400 bg-blue-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'unavailable': return 'text-red-400 bg-red-400/20';
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'active': return 'text-blue-400 bg-blue-400/20';
      case 'completed': return 'text-gray-400 bg-gray-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'suspended': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'cars', name: 'Cars', icon: TruckIcon },
    { id: 'bookings', name: 'Bookings', icon: CalendarIcon },
    { id: 'users', name: 'Users', icon: UserGroupIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your car rental business</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="bg-gradient-neon text-dark-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Car
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-neon text-dark-900'
                      : 'text-gray-400 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-white">${analytics.totalRevenue.toLocaleString()}</p>
                        <p className="text-green-400 text-sm flex items-center">
                          <ArrowUpIcon className="w-4 h-4 mr-1" />
                          +12.5% from last month
                        </p>
                      </div>
                      <CurrencyDollarIcon className="w-8 h-8 text-neon-green" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Bookings</p>
                        <p className="text-2xl font-bold text-white">{analytics.totalBookings}</p>
                        <p className="text-blue-400 text-sm flex items-center">
                          <ArrowUpIcon className="w-4 h-4 mr-1" />
                          +8.2% from last month
                        </p>
                      </div>
                      <CalendarIcon className="w-8 h-8 text-neon-blue" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Cars</p>
                        <p className="text-2xl font-bold text-white">{analytics.totalCars}</p>
                        <p className="text-gray-400 text-sm">{analytics.availableCars} available</p>
                      </div>
                      <TruckIcon className="w-8 h-8 text-neon-purple" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-white">{analytics.totalUsers}</p>
                        <p className="text-green-400 text-sm flex items-center">
                          <ArrowUpIcon className="w-4 h-4 mr-1" />
                          +{analytics.newUsers} this month
                        </p>
                      </div>
                      <UserGroupIcon className="w-8 h-8 text-neon-pink" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-dark-800 rounded-xl border border-dark-700">
                    <div className="p-6 border-b border-dark-700">
                      <h3 className="text-xl font-semibold text-white">Recent Bookings</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium">{booking.carName}</h4>
                              <p className="text-gray-400 text-sm">{booking.customerName}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <p className="text-white font-semibold mt-1">${booking.totalPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700">
                    <div className="p-6 border-b border-dark-700">
                      <h3 className="text-xl font-semibold text-white">Car Status</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Available</span>
                          <span className="text-green-400 font-semibold">{analytics.availableCars}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Rented</span>
                          <span className="text-blue-400 font-semibold">{analytics.totalCars - analytics.availableCars}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Maintenance</span>
                          <span className="text-yellow-400 font-semibold">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Occupancy Rate</span>
                          <span className="text-neon-blue font-semibold">{analytics.occupancyRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cars Tab */}
            {activeTab === 'cars' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Car Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cars..."
                        className="pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      />
                    </div>
                    <button className="bg-gradient-neon text-dark-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Add Car
                    </button>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-700">
                        {cars.map((car) => (
                          <tr key={car.id} className="hover:bg-dark-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded flex items-center justify-center">
                                  <TruckIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{car.name}</div>
                                  <div className="text-gray-400 text-sm">{car.year} • {car.mileage.toLocaleString()} mi</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/20 text-neon-blue">
                                {car.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-semibold">${car.price}</div>
                              <div className="text-gray-400 text-sm">/day</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{car.location}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-semibold">${car.totalRevenue.toLocaleString()}</div>
                              <div className="text-gray-400 text-sm">{car.totalRentals} rentals</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Booking Management</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <button className="bg-gradient-neon text-dark-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      <ArrowPathIcon className="w-5 h-5 mr-2" />
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Booking ID</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dates</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-700">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-dark-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-white font-mono text-sm">#{booking.id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-medium">{booking.carName}</div>
                              <div className="text-gray-400 text-sm">{booking.totalDays} days</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-medium">{booking.customerName}</div>
                              <div className="text-gray-400 text-sm">{booking.customerEmail}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{booking.startDate}</div>
                              <div className="text-gray-400 text-sm">to {booking.endDate}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.paymentStatus)}`}>
                                {booking.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-semibold">${booking.totalPrice}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      />
                    </div>
                    <select className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bookings</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Spent</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-700">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-dark-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                                  <UserGroupIcon className="w-6 h-6 text-dark-900" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-sm">Member since {new Date(user.memberSince).getFullYear()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{user.email}</div>
                              <div className="text-gray-400 text-sm">{user.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-semibold">{user.totalBookings}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white font-semibold">${user.totalSpent}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-400 text-sm">{user.lastLogin}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Revenue</span>
                        <span className="text-2xl font-bold text-neon-green">${analytics.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">This Month</span>
                        <span className="text-xl font-semibold text-white">${analytics.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Growth Rate</span>
                        <span className="text-green-400 font-semibold flex items-center">
                          <ArrowUpIcon className="w-4 h-4 mr-1" />
                          +12.5%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Booking Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Bookings</span>
                        <span className="text-2xl font-bold text-neon-blue">{analytics.totalBookings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Active Bookings</span>
                        <span className="text-xl font-semibold text-white">{analytics.activeBookings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average Rating</span>
                        <span className="text-yellow-400 font-semibold flex items-center">
                          <StarIcon className="w-4 h-4 mr-1" />
                          {analytics.averageRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Fleet Management</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Cars</span>
                        <span className="text-2xl font-bold text-neon-purple">{analytics.totalCars}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Available</span>
                        <span className="text-xl font-semibold text-green-400">{analytics.availableCars}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Occupancy Rate</span>
                        <span className="text-xl font-semibold text-neon-blue">{analytics.occupancyRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Users</span>
                        <span className="text-2xl font-bold text-neon-pink">{analytics.totalUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">New This Month</span>
                        <span className="text-xl font-semibold text-green-400">+{analytics.newUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Growth Rate</span>
                        <span className="text-green-400 font-semibold flex items-center">
                          <ArrowUpIcon className="w-4 h-4 mr-1" />
                          +8.2%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                    <button className="bg-gradient-neon text-dark-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      <DocumentTextIcon className="w-5 h-5 mr-2" />
                      Generate Report
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-dark-700 rounded-lg text-left hover:bg-dark-600 transition-colors">
                      <div className="text-white font-medium">Monthly Revenue Report</div>
                      <div className="text-gray-400 text-sm">Generate detailed revenue analysis</div>
                    </button>
                    <button className="p-4 bg-dark-700 rounded-lg text-left hover:bg-dark-600 transition-colors">
                      <div className="text-white font-medium">Customer Analytics</div>
                      <div className="text-gray-400 text-sm">View customer behavior insights</div>
                    </button>
                    <button className="p-4 bg-dark-700 rounded-lg text-left hover:bg-dark-600 transition-colors">
                      <div className="text-white font-medium">Fleet Performance</div>
                      <div className="text-gray-400 text-sm">Analyze car utilization rates</div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">System Settings</h2>

                <div className="space-y-6">
                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                        <input
                          type="text"
                          defaultValue="Monstrac CarRent"
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Default Currency</label>
                        <select className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                        <select className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue">
                          <option>UTC-5 (EST)</option>
                          <option>UTC-8 (PST)</option>
                          <option>UTC+0 (GMT)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Booking Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Booking Duration (hours)</label>
                        <input
                          type="number"
                          defaultValue="2"
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Booking Duration (days)</label>
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Advance Booking Limit (days)</label>
                        <input
                          type="number"
                          defaultValue="90"
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Payment Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Enable Stripe Payments</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Enable PayPal</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Enable Apple Pay</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-gradient-neon text-dark-900 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Save Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;