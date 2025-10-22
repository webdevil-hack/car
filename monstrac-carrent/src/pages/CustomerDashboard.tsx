import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Wallet,
  Share2,
  User,
  FileText,
  Download,
  Copy,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const CustomerDashboard = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const referralCode = 'MONSTRAC' + user?.id?.slice(0, 6).toUpperCase();

  const upcomingBookings = [
    {
      id: 'BK001',
      car: 'Tesla Model 3',
      pickup: '2024-10-25',
      return: '2024-10-28',
      status: 'confirmed',
      total: 4500,
    },
  ];

  const pastBookings = [
    {
      id: 'BK000',
      car: 'BMW X5',
      pickup: '2024-10-10',
      return: '2024-10-13',
      status: 'completed',
      total: 7800,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'referrals', label: 'Referrals', icon: Share2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="glow-text">{user?.name}!</span>
            </h1>
            <p className="text-gray-400">Manage your bookings and account</p>
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
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: 'Active Bookings', value: '1', icon: Calendar, color: 'accent-primary' },
                      { label: 'Wallet Balance', value: `₹${user?.walletBalance}`, icon: Wallet, color: 'neon-purple' },
                      { label: 'Referrals', value: '3', icon: Share2, color: 'neon-green' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card p-6"
                      >
                        <div className={`w-12 h-12 bg-${stat.color}/20 rounded-lg flex items-center justify-center mb-4`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                        </div>
                        <div className="text-3xl font-bold glow-text mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Upcoming Booking */}
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Upcoming Trip</h2>
                    {upcomingBookings.length > 0 ? (
                      upcomingBookings.map((booking) => (
                        <div key={booking.id} className="bg-dark-bg rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white">{booking.car}</h3>
                              <p className="text-sm text-gray-400">Booking ID: {booking.id}</p>
                            </div>
                            <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-xs font-semibold">
                              {booking.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-3 text-gray-300">
                              <Calendar className="w-5 h-5 text-accent-primary" />
                              <div>
                                <div className="text-xs text-gray-500">Pickup</div>
                                <div className="font-medium">{booking.pickup}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                              <Calendar className="w-5 h-5 text-neon-purple" />
                              <div>
                                <div className="text-xs text-gray-500">Return</div>
                                <div className="font-medium">{booking.return}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                            <div className="text-2xl font-bold glow-text">₹{booking.total}</div>
                            <button className="btn-primary text-sm">View Details</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No upcoming bookings</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">My Bookings</h2>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-accent-primary">Upcoming</h3>
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="bg-dark-bg rounded-lg p-6 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-white">{booking.car}</h4>
                            <p className="text-sm text-gray-400">{booking.pickup} to {booking.return}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">₹{booking.total}</div>
                            <button className="text-sm text-accent-primary hover:text-neon-purple">
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 mt-8">
                      <h3 className="text-lg font-semibold text-gray-400">Past Bookings</h3>
                      {pastBookings.map((booking) => (
                        <div key={booking.id} className="bg-dark-bg rounded-lg p-6 flex justify-between items-center opacity-75">
                          <div>
                            <h4 className="font-bold text-white">{booking.car}</h4>
                            <p className="text-sm text-gray-400">{booking.pickup} to {booking.return}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">₹{booking.total}</div>
                            <button className="text-sm text-accent-primary hover:text-neon-purple flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>Invoice</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wallet' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Wallet</h2>
                    <div className="bg-gradient-to-br from-accent-primary to-neon-purple rounded-2xl p-8 mb-6">
                      <div className="text-sm text-white/80 mb-2">Available Balance</div>
                      <div className="text-5xl font-bold text-white mb-6">₹{user?.walletBalance}</div>
                      <button className="btn-secondary bg-white text-accent-primary border-white hover:bg-white/90">
                        Add Funds
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {[
                        { type: 'credit', desc: 'Referral Bonus', amount: 500, date: '2024-10-20' },
                        { type: 'debit', desc: 'Booking Payment', amount: -4500, date: '2024-10-18' },
                      ].map((txn, index) => (
                        <div key={index} className="flex justify-between items-center bg-dark-bg rounded-lg p-4">
                          <div>
                            <div className="font-medium text-white">{txn.desc}</div>
                            <div className="text-xs text-gray-500">{txn.date}</div>
                          </div>
                          <div className={`font-bold ${txn.type === 'credit' ? 'text-neon-green' : 'text-red-400'}`}>
                            {txn.amount > 0 ? '+' : ''}₹{txn.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'referrals' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Refer & Earn</h2>
                    
                    <div className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-2xl p-8 mb-6 border border-neon-purple/30">
                      <h3 className="text-2xl font-bold text-white mb-2">Earn ₹500 per referral</h3>
                      <p className="text-gray-300 mb-6">
                        Share your code and get ₹500 when your friend completes their first booking!
                      </p>
                      
                      <div className="bg-dark-bg rounded-lg p-4 flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Your Referral Code</div>
                          <div className="text-2xl font-bold glow-text font-mono">{referralCode}</div>
                        </div>
                        <button
                          onClick={copyReferralCode}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button className="btn-secondary">Share on WhatsApp</button>
                        <button className="btn-outline">Share Link</button>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4">Referral Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Total Referrals', value: '3' },
                        { label: 'Successful', value: '2' },
                        { label: 'Earned', value: '₹1000' },
                      ].map((stat, index) => (
                        <div key={index} className="bg-dark-bg rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold glow-text mb-1">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                    
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                          <input type="text" className="input-field" defaultValue={user?.name} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input type="email" className="input-field" defaultValue={user?.email} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                          <input type="tel" className="input-field" defaultValue={user?.phone || '+91 98765 43210'} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                          <input type="date" className="input-field" />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </form>
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

export default CustomerDashboard;
