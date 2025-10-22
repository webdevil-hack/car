import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Share2,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockCars } from '../data/mockData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars] = useState(mockCars.slice(0, 5));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'affiliate', label: 'Affiliate', icon: Share2 },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹2,45,000', change: '+12%', icon: DollarSign, color: 'neon-green' },
    { label: 'Active Cars', value: '48', change: '+5', icon: Car, color: 'accent-primary' },
    { label: 'Total Bookings', value: '156', change: '+23%', icon: Calendar, color: 'neon-purple' },
    { label: 'Active Drivers', value: '32', change: '+8', icon: Users, color: 'neon-pink' },
  ];

  const recentBookings = [
    { id: 'BK156', customer: 'Rajesh Kumar', car: 'Tesla Model 3', date: '2024-10-25', amount: 4500, status: 'active' },
    { id: 'BK155', customer: 'Priya Sharma', car: 'BMW X5', date: '2024-10-24', amount: 7800, status: 'completed' },
    { id: 'BK154', customer: 'Amit Patel', car: 'Mercedes C-Class', date: '2024-10-23', amount: 6200, status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin <span className="glow-text">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage your fleet and business</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-4 space-y-2 sticky top-24">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent-primary text-dark-bg font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-dark-hover'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                          </div>
                          <span className="text-neon-green text-sm font-semibold flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-3xl font-bold glow-text mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Revenue Trend</h3>
                      <div className="h-64 flex items-center justify-center bg-dark-bg rounded-lg">
                        <div className="text-center text-gray-500">
                          <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                          <p>Chart visualization would be here</p>
                        </div>
                      </div>
                    </div>
                    <div className="card p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Fleet Utilization</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Active', value: 75, color: 'neon-green' },
                          { label: 'Booked', value: 15, color: 'accent-primary' },
                          { label: 'Maintenance', value: 8, color: 'neon-pink' },
                          { label: 'Available', value: 2, color: 'gray-600' },
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">{item.label}</span>
                              <span className="text-white font-medium">{item.value}%</span>
                            </div>
                            <div className="w-full bg-dark-bg rounded-full h-2">
                              <div
                                className={`bg-${item.color} h-2 rounded-full transition-all`}
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Bookings */}
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-white">Recent Bookings</h3>
                      <button className="text-accent-primary hover:text-neon-purple text-sm">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-400 text-sm border-b border-dark-border">
                            <th className="pb-3">Booking ID</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Car</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentBookings.map((booking) => (
                            <tr key={booking.id} className="text-gray-300 border-b border-dark-border/50">
                              <td className="py-4 font-mono text-sm">{booking.id}</td>
                              <td className="py-4">{booking.customer}</td>
                              <td className="py-4">{booking.car}</td>
                              <td className="py-4 text-sm">{booking.date}</td>
                              <td className="py-4 font-semibold">₹{booking.amount}</td>
                              <td className="py-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    booking.status === 'active'
                                      ? 'bg-neon-green/20 text-neon-green'
                                      : 'bg-gray-600/20 text-gray-400'
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cars' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
                      <button className="btn-primary flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add New Car</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {cars.map((car) => (
                        <div key={car.id} className="bg-dark-bg rounded-lg p-6 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={car.image}
                              alt={car.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-bold text-white text-lg">{car.title}</h3>
                              <p className="text-sm text-gray-400">{car.brand} • {car.year}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span className="text-gray-500">{car.registration}</span>
                                <span className={`px-2 py-1 rounded text-xs ${car.available ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-400'}`}>
                                  {car.available ? 'Available' : 'Booked'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-dark-hover rounded-lg text-accent-primary">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-dark-hover rounded-lg text-neon-purple">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-dark-hover rounded-lg text-red-400">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'drivers' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Driver Management</h2>
                      <button className="btn-primary flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add Driver</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: 'Rajesh Kumar', license: 'DL1234567890', rating: 4.8, trips: 245, status: 'active' },
                        { name: 'Amit Singh', license: 'DL0987654321', rating: 4.9, trips: 189, status: 'active' },
                        { name: 'Vikram Patel', license: 'DL5678901234', rating: 4.7, trips: 156, status: 'off-duty' },
                      ].map((driver, index) => (
                        <div key={index} className="bg-dark-bg rounded-lg p-6 flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <img
                              src={`https://i.pravatar.cc/100?img=${index + 10}`}
                              alt={driver.name}
                              className="w-16 h-16 rounded-full"
                            />
                            <div>
                              <h3 className="font-bold text-white">{driver.name}</h3>
                              <p className="text-sm text-gray-400">License: {driver.license}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span className="text-yellow-400">⭐ {driver.rating}</span>
                                <span className="text-gray-500">{driver.trips} trips</span>
                                <span className={`px-2 py-1 rounded text-xs ${driver.status === 'active' ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-600/20 text-gray-400'}`}>
                                  {driver.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="btn-outline text-sm">View Profile</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'finance' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: 'Total Earnings', value: '₹2,45,000', color: 'neon-green' },
                      { label: 'Total Expenses', value: '₹45,000', color: 'red-400' },
                      { label: 'Net Profit', value: '₹2,00,000', color: 'accent-primary' },
                    ].map((stat, index) => (
                      <div key={index} className="card p-6">
                        <div className={`text-3xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="card p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {[
                        { type: 'income', desc: 'Booking Payment - BK156', amount: 4500, date: '2024-10-25' },
                        { type: 'expense', desc: 'Car Maintenance - Tesla Model 3', amount: -2500, date: '2024-10-24' },
                        { type: 'income', desc: 'Booking Payment - BK155', amount: 7800, date: '2024-10-24' },
                      ].map((txn, index) => (
                        <div key={index} className="flex justify-between items-center bg-dark-bg rounded-lg p-4">
                          <div>
                            <div className="font-medium text-white">{txn.desc}</div>
                            <div className="text-xs text-gray-500">{txn.date}</div>
                          </div>
                          <div className={`font-bold text-lg ${txn.type === 'income' ? 'text-neon-green' : 'text-red-400'}`}>
                            {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Analytics & Reports</h2>
                  <div className="h-96 flex items-center justify-center bg-dark-bg rounded-lg">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-24 h-24 mx-auto mb-4" />
                      <p className="text-lg">Advanced analytics dashboard</p>
                      <p className="text-sm">Charts and reports would be displayed here</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'affiliate' && (
                <div className="card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Affiliate Program</h2>
                  <div className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-xl p-8 border border-neon-purple/30">
                    <h3 className="text-2xl font-bold text-white mb-4">Grow Your Business</h3>
                    <p className="text-gray-300 mb-6">
                      Create affiliate campaigns and track referrals to expand your customer base.
                    </p>
                    <button className="btn-primary">Create Campaign</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
