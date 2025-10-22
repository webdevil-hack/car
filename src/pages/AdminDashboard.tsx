import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon,
  TruckIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  ChartBarIcon as ChartSolid,
  TruckIcon as TruckSolid,
  CalendarDaysIcon as CalendarSolid,
  UsersIcon as UsersSolid,
  Cog6ToothIcon as CogSolid
} from '@heroicons/react/24/solid';
import AnimatedCard from '../components/dashboard/AnimatedCard';
import StatCard from '../components/dashboard/StatCard';
import AnimatedButton from '../components/dashboard/AnimatedButton';
import AnimatedTable from '../components/dashboard/AnimatedTable';
import ProgressRing from '../components/dashboard/ProgressRing';
import Dashboard3DBackground from '../components/3d/Dashboard3DBackground';
import CarImage from '../components/CarImage';
import Loading3D from '../components/3d/Loading3D';
import apiService from '../services/api';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  status: 'available' | 'rented' | 'maintenance' | 'unavailable';
  rating: {
    average: number;
    count: number;
  };
  images: string[];
  location: {
    name: string;
    address: {
      city: string;
      state: string;
    };
  };
}

interface Booking {
  id: string;
  user: {
    name: string;
    email: string;
  };
  car: {
    name: string;
    brand: string;
    model: string;
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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'manager';
  status: 'active' | 'inactive' | 'suspended';
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
}

interface Analytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBookings: number;
  activeBookings: number;
  totalUsers: number;
  newUsers: number;
  totalCars: number;
  availableCars: number;
  revenueGrowth: number;
  userGrowth: number;
  bookingGrowth: number;
  carUtilization: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch analytics
        const analyticsResponse = await apiService.getDashboardStats();
        setAnalytics(analyticsResponse.data.overview);
        
        // Fetch cars
        const carsResponse = await apiService.getCars({ limit: 50 });
        setCars(carsResponse.data.cars);
        
        // Fetch bookings
        const bookingsResponse = await apiService.getBookings({ limit: 50 });
        setBookings(bookingsResponse.data.bookings);
        
        // Fetch users
        const usersResponse = await apiService.getUsers({ limit: 50 });
        setUsers(usersResponse.data.users);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon, iconSolid: ChartSolid },
    { id: 'cars', label: 'Cars', icon: TruckIcon, iconSolid: TruckSolid },
    { id: 'bookings', label: 'Bookings', icon: CalendarDaysIcon, iconSolid: CalendarSolid },
    { id: 'users', label: 'Users', icon: UsersIcon, iconSolid: UsersSolid },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, iconSolid: CogSolid }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'text-green-400 bg-green-400/10 border-green-400/20',
      rented: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      maintenance: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      unavailable: 'text-red-400 bg-red-400/10 border-red-400/20',
      pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      active: 'text-green-400 bg-green-400/10 border-green-400/20',
      completed: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
      cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
      inactive: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
      suspended: 'text-red-400 bg-red-400/10 border-red-400/20'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      available: CheckCircleIcon,
      rented: ClockIcon,
      maintenance: Cog6ToothIcon,
      unavailable: XCircleIcon,
      pending: ClockIcon,
      confirmed: ShieldCheckIcon,
      active: SparklesIcon,
      completed: CheckCircleIcon,
      cancelled: XCircleIcon,
      inactive: XCircleIcon,
      suspended: XCircleIcon
    };
    return icons[status as keyof typeof icons] || ClockIcon;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-48 h-48 mb-4">
            <Loading3D size={2} />
          </div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Dashboard3DBackground 
          height="100vh" 
          showCars={true}
          showFloatingElements={true}
          showCards={true}
        />
      </div>
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
                Admin Dashboard 🚀
              </motion.h1>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Manage your car rental business
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
                Add New
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      title="Total Revenue"
                      value={`$${analytics?.totalRevenue?.toLocaleString() || '0'}`}
                      change={{ value: analytics?.revenueGrowth || 0, type: analytics?.revenueGrowth && analytics.revenueGrowth > 0 ? 'increase' : 'decrease' }}
                      icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                      color="green"
                      delay={0}
                    />
                    <StatCard
                      title="Total Bookings"
                      value={analytics?.totalBookings || 0}
                      change={{ value: analytics?.bookingGrowth || 0, type: analytics?.bookingGrowth && analytics.bookingGrowth > 0 ? 'increase' : 'decrease' }}
                      icon={<CalendarDaysIcon className="w-6 h-6" />}
                      color="blue"
                      delay={0.1}
                    />
                    <StatCard
                      title="Total Users"
                      value={analytics?.totalUsers || 0}
                      change={{ value: analytics?.userGrowth || 0, type: analytics?.userGrowth && analytics.userGrowth > 0 ? 'increase' : 'decrease' }}
                      icon={<UsersIcon className="w-6 h-6" />}
                      color="purple"
                      delay={0.2}
                    />
                    <StatCard
                      title="Available Cars"
                      value={`${analytics?.availableCars || 0}/${analytics?.totalCars || 0}`}
                      icon={<TruckIcon className="w-6 h-6" />}
                      color="orange"
                      delay={0.3}
                    />
                  </div>

                  {/* Charts and Analytics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatedCard delay={0.4} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Revenue Overview</h3>
                      <div className="flex items-center justify-center h-64">
                        <ProgressRing
                          progress={analytics?.carUtilization || 0}
                          size={160}
                          color="#00D4FF"
                          label="Car Utilization"
                        />
                      </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.5} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Quick Stats</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg flex items-center justify-center">
                              <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Monthly Revenue</p>
                              <p className="text-gray-400 text-sm">This month</p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-white">${analytics?.monthlyRevenue?.toLocaleString() || '0'}</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                              <CalendarDaysIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Active Bookings</p>
                              <p className="text-gray-400 text-sm">Currently active</p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-white">{analytics?.activeBookings || 0}</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                              <UsersIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">New Users</p>
                              <p className="text-gray-400 text-sm">This month</p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-white">{analytics?.newUsers || 0}</p>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>

                  {/* Recent Activity */}
                  <AnimatedCard delay={0.6} className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl hover:bg-dark-700/70 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                            <CalendarDaysIcon className="w-6 h-6 text-neon-blue" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{booking.user.name} booked {booking.car.name}</h4>
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
                </motion.div>
              )}

              {activeTab === 'cars' && (
                <motion.div
                  key="cars"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Car Fleet Management</h2>
                    <AnimatedButton
                      variant="primary"
                      gradient
                      glow
                      icon={<PlusIcon className="w-5 h-5" />}
                    >
                      Add New Car
                    </AnimatedButton>
                  </div>

                  <AnimatedTable
                    columns={[
                      {
                        key: 'car',
                        label: 'Car',
                        render: (_, row) => (
                          <div className="flex items-center space-x-3">
                            <CarImage
                              carName={row.name}
                              brand={row.brand}
                              price={row.price}
                              size="sm"
                              animated={false}
                              glow={false}
                            />
                            <div>
                              <p className="text-white font-medium">{row.name}</p>
                              <p className="text-gray-400 text-sm">{row.brand} {row.model} • {row.year}</p>
                            </div>
                          </div>
                        )
                      },
                      {
                        key: 'category',
                        label: 'Category',
                        render: (_, row) => (
                          <span className="text-gray-300 capitalize">{row.category}</span>
                        )
                      },
                      {
                        key: 'price',
                        label: 'Price',
                        render: (_, row) => (
                          <p className="text-white font-semibold">${row.price}/day</p>
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
                        key: 'rating',
                        label: 'Rating',
                        render: (_, row) => (
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white">{row.rating.average}</span>
                            <span className="text-gray-400 text-sm">({row.rating.count})</span>
                          </div>
                        )
                      },
                      {
                        key: 'location',
                        label: 'Location',
                        render: (_, row) => (
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{row.location.address.city}, {row.location.address.state}</span>
                          </div>
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
                    data={cars}
                  />
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
                    <h2 className="text-2xl font-bold text-white">Booking Management</h2>
                    <div className="flex space-x-4">
                      <AnimatedButton
                        variant="secondary"
                        icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                      >
                        Export
                      </AnimatedButton>
                      <AnimatedButton
                        variant="primary"
                        gradient
                        glow
                        icon={<PlusIcon className="w-5 h-5" />}
                      >
                        New Booking
                      </AnimatedButton>
                    </div>
                  </div>

                  <AnimatedTable
                    columns={[
                      {
                        key: 'booking',
                        label: 'Booking',
                        render: (_, row) => (
                          <div>
                            <p className="text-white font-medium">#{row.id.slice(-8)}</p>
                            <p className="text-gray-400 text-sm">{new Date(row.createdAt).toLocaleDateString()}</p>
                          </div>
                        )
                      },
                      {
                        key: 'user',
                        label: 'Customer',
                        render: (_, row) => (
                          <div>
                            <p className="text-white font-medium">{row.user.name}</p>
                            <p className="text-gray-400 text-sm">{row.user.email}</p>
                          </div>
                        )
                      },
                      {
                        key: 'car',
                        label: 'Car',
                        render: (_, row) => (
                          <div>
                            <p className="text-white font-medium">{row.car.name}</p>
                            <p className="text-gray-400 text-sm">{row.car.brand} {row.car.model}</p>
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
                          </div>
                        )
                      }
                    ]}
                    data={bookings}
                  />
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <div className="flex space-x-4">
                      <AnimatedButton
                        variant="secondary"
                        icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                      >
                        Export
                      </AnimatedButton>
                      <AnimatedButton
                        variant="primary"
                        gradient
                        glow
                        icon={<PlusIcon className="w-5 h-5" />}
                      >
                        Add User
                      </AnimatedButton>
                    </div>
                  </div>

                  <AnimatedTable
                    columns={[
                      {
                        key: 'user',
                        label: 'User',
                        render: (_, row) => (
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center">
                              <UsersIcon className="w-5 h-5 text-neon-blue" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{row.name}</p>
                              <p className="text-gray-400 text-sm">{row.email}</p>
                            </div>
                          </div>
                        )
                      },
                      {
                        key: 'role',
                        label: 'Role',
                        render: (_, row) => (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            row.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                            row.role === 'manager' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {row.role}
                          </span>
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
                        key: 'bookings',
                        label: 'Bookings',
                        render: (_, row) => (
                          <p className="text-white font-semibold">{row.totalBookings}</p>
                        )
                      },
                      {
                        key: 'spent',
                        label: 'Total Spent',
                        render: (_, row) => (
                          <p className="text-white font-semibold">${row.totalSpent.toLocaleString()}</p>
                        )
                      },
                      {
                        key: 'joined',
                        label: 'Joined',
                        render: (_, row) => (
                          <p className="text-gray-300">{new Date(row.createdAt).toLocaleDateString()}</p>
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
                    data={users}
                  />
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
                  <h2 className="text-2xl font-bold text-white">System Settings</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatedCard delay={0.1} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">General Settings</h3>
                      <div className="space-y-4">
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<Cog6ToothIcon className="w-5 h-5" />}
                        >
                          System Configuration
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<BellIcon className="w-5 h-5" />}
                        >
                          Notification Settings
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<CreditCardIcon className="w-5 h-5" />}
                        >
                          Payment Settings
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2} className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">Security</h3>
                      <div className="space-y-4">
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<ShieldCheckIcon className="w-5 h-5" />}
                        >
                          Security Settings
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<UsersIcon className="w-5 h-5" />}
                        >
                          User Permissions
                        </AnimatedButton>
                        <AnimatedButton
                          variant="secondary"
                          className="w-full justify-start"
                          icon={<Cog6ToothIcon className="w-5 h-5" />}
                        >
                          API Settings
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

export default AdminDashboard;