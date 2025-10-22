import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  HeartIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  ChartBarIcon,
  TruckIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Booking {
  id: string;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  pickupLocation: string;
  returnLocation: string;
  createdAt: string;
}

interface FavoriteCar {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  addedAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  memberSince: string;
  totalBookings: number;
  totalSpent: number;
  loyaltyPoints: number;
}

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    licenseNumber: 'DL123456789',
    memberSince: '2023-01-15',
    totalBookings: 12,
    totalSpent: 2450.00,
    loyaltyPoints: 2450
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setBookings([
      {
        id: '1',
        carName: 'BMW X5',
        carImage: '/api/placeholder/300/200',
        startDate: '2024-01-15',
        endDate: '2024-01-18',
        totalDays: 3,
        totalPrice: 450.00,
        status: 'confirmed',
        pickupLocation: 'Downtown Office',
        returnLocation: 'Airport Terminal',
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        carName: 'Tesla Model 3',
        carImage: '/api/placeholder/300/200',
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        totalDays: 2,
        totalPrice: 320.00,
        status: 'pending',
        pickupLocation: 'Airport Terminal',
        returnLocation: 'Downtown Office',
        createdAt: '2024-01-12'
      },
      {
        id: '3',
        carName: 'Mercedes C-Class',
        carImage: '/api/placeholder/300/200',
        startDate: '2023-12-25',
        endDate: '2023-12-28',
        totalDays: 3,
        totalPrice: 380.00,
        status: 'completed',
        pickupLocation: 'City Center',
        returnLocation: 'City Center',
        createdAt: '2023-12-20'
      }
    ]);

    setFavorites([
      {
        id: '1',
        name: 'BMW X5',
        image: '/api/placeholder/300/200',
        price: 150,
        rating: 4.8,
        category: 'SUV',
        addedAt: '2024-01-10'
      },
      {
        id: '2',
        name: 'Tesla Model 3',
        image: '/api/placeholder/300/200',
        price: 160,
        rating: 4.9,
        category: 'Electric',
        addedAt: '2024-01-08'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'bookings', name: 'My Bookings', icon: CalendarIcon },
    { id: 'favorites', name: 'Favorites', icon: HeartIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {profile.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-dark-900" />
              </div>
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
                        <p className="text-gray-400 text-sm">Total Bookings</p>
                        <p className="text-2xl font-bold text-white">{profile.totalBookings}</p>
                      </div>
                      <CalendarIcon className="w-8 h-8 text-neon-blue" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Spent</p>
                        <p className="text-2xl font-bold text-white">${profile.totalSpent.toFixed(2)}</p>
                      </div>
                      <CreditCardIcon className="w-8 h-8 text-neon-purple" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Loyalty Points</p>
                        <p className="text-2xl font-bold text-white">{profile.loyaltyPoints}</p>
                      </div>
                      <StarIcon className="w-8 h-8 text-neon-green" />
                    </div>
                  </div>
                  <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Member Since</p>
                        <p className="text-2xl font-bold text-white">{new Date(profile.memberSince).getFullYear()}</p>
                      </div>
                      <UserIcon className="w-8 h-8 text-neon-pink" />
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-dark-800 rounded-xl border border-dark-700">
                  <div className="p-6 border-b border-dark-700">
                    <h3 className="text-xl font-semibold text-white">Recent Bookings</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                              <TruckIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{booking.carName}</h4>
                              <p className="text-gray-400 text-sm">{booking.startDate} - {booking.endDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </span>
                            <span className="text-white font-semibold">${booking.totalPrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-neon-blue hover:text-neon-purple transition-colors">
                      View All Bookings
                    </button>
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
                  <h2 className="text-2xl font-bold text-white">My Bookings</h2>
                  <button className="bg-gradient-neon text-dark-900 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    New Booking
                  </button>
                </div>

                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dates</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-700">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-dark-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded flex items-center justify-center">
                                  <TruckIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{booking.carName}</div>
                                  <div className="text-gray-400 text-sm">{booking.totalDays} days</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{booking.startDate}</div>
                              <div className="text-gray-400 text-sm">to {booking.endDate}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{booking.pickupLocation}</div>
                              <div className="text-gray-400 text-sm">to {booking.returnLocation}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="capitalize">{booking.status}</span>
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
                                {booking.status === 'pending' && (
                                  <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                                    <XCircleIcon className="w-4 h-4" />
                                  </button>
                                )}
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

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">My Favorites</h2>
                  <span className="text-gray-400">{favorites.length} cars</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((car) => (
                    <div key={car.id} className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden hover:border-neon-blue/50 transition-colors">
                      <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                        <TruckIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold">{car.name}</h3>
                          <HeartSolidIcon className="w-5 h-5 text-neon-pink" />
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarSolidIcon
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400 text-sm">{car.rating}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-neon-blue">${car.price}</span>
                          <span className="text-gray-400 text-sm">/day</span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 bg-gradient-neon text-dark-900 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Book Now
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>

                <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">License Number</label>
                        <input
                          type="text"
                          value={profile.licenseNumber}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <textarea
                        value={profile.address}
                        rows={3}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button className="bg-gradient-neon text-dark-900 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Save Changes
                      </button>
                    </div>
                  </form>
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
                <h2 className="text-2xl font-bold text-white">Settings</h2>

                <div className="space-y-6">
                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Email Notifications</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">SMS Notifications</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Push Notifications</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" defaultChecked />
                      </label>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Profile Visibility</span>
                        <select className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white">
                          <option>Public</option>
                          <option>Friends Only</option>
                          <option>Private</option>
                        </select>
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Data Sharing</span>
                        <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
                    <div className="space-y-4">
                      <button className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors">
                        Delete Account
                      </button>
                    </div>
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

export default CustomerDashboard;