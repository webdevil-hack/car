import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  CalendarDaysIcon, 
  HeartIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  UserIcon as UserSolid,
  CalendarDaysIcon as CalendarSolid,
  HeartIcon as HeartSolid,
  Cog6ToothIcon as CogSolid,
  ChartBarIcon as ChartSolid
} from '@heroicons/react/24/solid';
import AnimatedCard from '../components/dashboard/AnimatedCard';
import StatCard from '../components/dashboard/StatCard';
import AnimatedButton from '../components/dashboard/AnimatedButton';
import AnimatedTable from '../components/dashboard/AnimatedTable';
import ProgressRing from '../components/dashboard/ProgressRing';
import apiService from '../services/api';

interface Booking {
  id: string;
  car: {
    name: string;
    brand: string;
    model: string;
    image: string;
  };
  dates: {
    startDate: string;
    endDate: string;
    totalDays: number;
  };
  pricing: {
    total: number;
  };
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

interface FavoriteCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  rating: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    currency: string;
    language: string;
  };
}

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await apiService.getCurrentUser();
        setProfile(userResponse.data.user);
        
        // Fetch bookings
        const bookingsResponse = await apiService.getBookings();
        setBookings(bookingsResponse.data.bookings);
        
        // Mock favorites data
        setFavorites([
          {
            id: '1',
            name: 'BMW X5',
            brand: 'BMW',
            model: 'X5',
            price: 150,
            image: '/images/cars/bmw-x5.jpg',
            rating: 4.8
          },
          {
            id: '2',
            name: 'Tesla Model 3',
            brand: 'Tesla',
            model: 'Model 3',
            price: 160,
            image: '/images/cars/tesla-model3.jpg',
            rating: 4.9
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon, iconSolid: ChartSolid },
    { id: 'bookings', label: 'My Bookings', icon: CalendarDaysIcon, iconSolid: CalendarSolid },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon, iconSolid: HeartSolid },
    { id: 'profile', label: 'Profile', icon: UserIcon, iconSolid: UserSolid },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, iconSolid: CogSolid }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      active: 'text-green-400 bg-green-400/10 border-green-400/20',
      completed: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
      cancelled: 'text-red-400 bg-red-400/10 border-red-400/20'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: ClockIcon,
      confirmed: ShieldCheckIcon,
      active: SparklesIcon,
      completed: CheckCircleIcon,
      cancelled: XCircleIcon
    };
    return icons[status as keyof typeof icons] || ClockIcon;
  };

  const CheckCircleIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const XCircleIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-dark-800/80 to-dark-900/80 backdrop-blur-sm border-b border-dark-700/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, {profile?.name || 'User'}! 👋
              </motion.h1>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Manage your bookings and preferences
              </motion.p>
            </div>
            
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton
                variant="ghost"
                size="sm"
                icon={<BellIcon className="w-5 h-5" />}
                className="relative"
              >
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </AnimatedButton>
              
              <AnimatedButton
                variant="primary"
                size="sm"
                icon={<PlusIcon className="w-5 h-5" />}
                gradient
                glow
              >
                New Booking
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:w-80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedCard className="p-2">
              <nav className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = activeTab === tab.id ? tab.iconSolid : tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                        ${activeTab === tab.id 
                          ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-white border border-neon-blue/30' 
                          : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
                        }
                      `}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-neon-blue rounded-full"
                          layoutId="activeTab"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </AnimatedCard>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatCard
                      title="Total Bookings"
                      value={bookings.length}
                      change={{ value: 12, type: 'increase' }}
                      icon={<CalendarDaysIcon className="w-6 h-6" />}
                      color="blue"
                      delay={0}
                    />
                    <StatCard
                      title="Active Bookings"
                      value={bookings.filter(b => b.status === 'active').length}
                      change={{ value: 5, type: 'increase' }}
                      icon={<SparklesIcon className="w-6 h-6" />}
                      color="green"
                      delay={0.1}
                    />
                    <StatCard
                      title="Favorites"
                      value={favorites.length}
                      icon={<HeartIcon className="w-6 h-6" />}
                      color="pink"
                      delay={0.2}
                    />
                    <StatCard
                      title="Total Spent"
                      value={`$${bookings.reduce((sum, b) => sum + b.pricing.total, 0).toLocaleString()}`}
                      change={{ value: 8, type: 'increase' }}
                      icon={<CreditCardIcon className="w-6 h-6" />}
                      color="purple"
                      delay={0.3}
                    />
                  </div>

                  {/* Recent Bookings */}
                  <AnimatedCard delay={0.4} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">Recent Bookings</h3>
                      <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('bookings')}
                      >
                        View All
                      </AnimatedButton>
                    </div>
                    
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl hover:bg-dark-700/70 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                            <CalendarDaysIcon className="w-8 h-8 text-neon-blue" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{booking.car.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {new Date(booking.dates.startDate).toLocaleDateString()} - {new Date(booking.dates.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {React.createElement(getStatusIcon(booking.status), { className: "w-3 h-3" })}
                              <span className="capitalize">{booking.status}</span>
                            </div>
                            <p className="text-white font-semibold mt-1">${booking.pricing.total}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatedCard>

                  {/* Quick Actions */}
                  <AnimatedCard delay={0.5} className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnimatedButton
                        variant="primary"
                        gradient
                        glow
                        className="h-20 flex-col space-y-2"
                        onClick={() => setActiveTab('bookings')}
                      >
                        <CalendarDaysIcon className="w-8 h-8" />
                        <span>Book a Car</span>
                      </AnimatedButton>
                      <AnimatedButton
                        variant="secondary"
                        className="h-20 flex-col space-y-2"
                        onClick={() => setActiveTab('favorites')}
                      >
                        <HeartIcon className="w-8 h-8" />
                        <span>View Favorites</span>
                      </AnimatedButton>
                      <AnimatedButton
                        variant="secondary"
                        className="h-20 flex-col space-y-2"
                        onClick={() => setActiveTab('profile')}
                      >
                        <UserIcon className="w-8 h-8" />
                        <span>Edit Profile</span>
                      </AnimatedButton>
                    </div>
                  </AnimatedCard>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">My Bookings</h2>
                    <AnimatedButton
                      variant="primary"
                      gradient
                      glow
                      icon={<PlusIcon className="w-5 h-5" />}
                    >
                      New Booking
                    </AnimatedButton>
                  </div>

                  <AnimatedTable
                    columns={[
                      {
                        key: 'car',
                        label: 'Car',
                        render: (_, row) => (
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                              <CalendarDaysIcon className="w-6 h-6 text-neon-blue" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{row.car.name}</p>
                              <p className="text-gray-400 text-sm">{row.car.brand} {row.car.model}</p>
                            </div>
                          </div>
                        )
                      },
                      {
                        key: 'dates',
                        label: 'Dates',
                        render: (_, row) => (
                          <div>
                            <p className="text-white">{new Date(row.dates.startDate).toLocaleDateString()}</p>
                            <p className="text-gray-400 text-sm">{row.dates.totalDays} days</p>
                          </div>
                        )
                      },
                      {
                        key: 'status',
                        label: 'Status',
                        render: (_, row) => (
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                            {React.createElement(getStatusIcon(row.status), { className: "w-3 h-3" })}
                            <span className="capitalize">{row.status}</span>
                          </div>
                        )
                      },
                      {
                        key: 'total',
                        label: 'Total',
                        render: (_, row) => (
                          <p className="text-white font-semibold">${row.pricing.total}</p>
                        )
                      },
                      {
                        key: 'actions',
                        label: 'Actions',
                        render: (_, row) => (
                          <div className="flex items-center space-x-2">
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<EyeIcon className="w-4 h-4" />}
                            />
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<PencilIcon className="w-4 h-4" />}
                            />
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<TrashIcon className="w-4 h-4" />}
                            />
                          </div>
                        )
                      }
                    ]}
                    data={bookings}
                  />
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">My Favorites</h2>
                    <AnimatedButton
                      variant="primary"
                      gradient
                      glow
                      icon={<PlusIcon className="w-5 h-5" />}
                    >
                      Browse Cars
                    </AnimatedButton>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {favorites.map((car, index) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AnimatedCard className="p-6 hover:border-neon-pink/30">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                              <HeartIcon className="w-8 h-8 text-neon-pink" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold">{car.name}</h3>
                              <p className="text-gray-400 text-sm">{car.brand} {car.model}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-sm font-medium">{car.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-white">${car.price}<span className="text-gray-400 text-sm font-normal">/day</span></p>
                            <div className="flex space-x-2">
                              <AnimatedButton
                                variant="ghost"
                                size="sm"
                                icon={<EyeIcon className="w-4 h-4" />}
                              />
                              <AnimatedButton
                                variant="ghost"
                                size="sm"
                                icon={<TrashIcon className="w-4 h-4" />}
                              />
                            </div>
                          </div>
                        </AnimatedCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatedCard delay={0.1} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={profile?.name || ''}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={profile?.email || ''}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue={profile?.phone || ''}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                          />
                        </div>
                      </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                          <select className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors">
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                          <select className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-gray-300">Notifications</h4>
                          <div className="space-y-2">
                            {[
                              { key: 'email', label: 'Email notifications' },
                              { key: 'sms', label: 'SMS notifications' },
                              { key: 'push', label: 'Push notifications' }
                            ].map((notif) => (
                              <label key={notif.key} className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  defaultChecked={profile?.preferences?.notifications?.[notif.key as keyof typeof profile.preferences.notifications] || false}
                                  className="w-4 h-4 text-neon-blue bg-dark-700 border-dark-600 rounded focus:ring-neon-blue focus:ring-2"
                                />
                                <span className="text-gray-300">{notif.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <AnimatedButton variant="secondary">
                      Cancel
                    </AnimatedButton>
                    <AnimatedButton
                      variant="primary"
                      gradient
                      glow
                    >
                      Save Changes
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatedCard delay={0.1} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Security</h3>
                      <div className="space-y-4">
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<ShieldCheckIcon className="w-5 h-5" />}
                        >
                          Change Password
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<CreditCardIcon className="w-5 h-5" />}
                        >
                          Payment Methods
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<BellIcon className="w-5 h-5" />}
                        >
                          Notification Settings
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Account</h3>
                      <div className="space-y-4">
                        <AnimatedButton
                          variant="danger"
                          className="w-full justify-start"
                          icon={<TrashIcon className="w-5 h-5" />}
                        >
                          Delete Account
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<Cog6ToothIcon className="w-5 h-5" />}
                        >
                          Privacy Settings
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;