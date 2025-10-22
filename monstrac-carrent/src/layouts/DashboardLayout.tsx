import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  CalendarDaysIcon,
  WalletIcon,
  UserCircleIcon,
  GiftIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Redirect if not authenticated
  if (!user || user.role !== 'customer') {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'My Bookings', href: '/dashboard/bookings', icon: CalendarDaysIcon },
    { name: 'Wallet', href: '/dashboard/wallet', icon: WalletIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Refer & Earn', href: '/dashboard/referrals', icon: GiftIcon },
  ];

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : '-100%',
        }}
        className={`
          fixed lg:relative lg:translate-x-0 top-0 left-0 z-50
          w-64 h-full bg-dark-900 border-r border-dark-800/50
          transition-transform duration-300 lg:block
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-800/50">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-primary/20 blur-xl" />
                <svg
                  className="w-8 h-8 relative"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5L35 15V25L20 35L5 25V15L20 5Z"
                    className="fill-accent-primary"
                  />
                  <path
                    d="M20 15L25 18V22L20 25L15 22V18L20 15Z"
                    className="fill-dark-900"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Monstrac
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-dark-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary p-0.5">
                <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-gray-300" />
                </div>
              </div>
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            {user.walletBalance !== undefined && (
              <div className="mt-4 p-3 bg-dark-800 rounded-lg">
                <p className="text-xs text-gray-400">Wallet Balance</p>
                <p className="text-lg font-semibold text-accent-primary">
                  ${user.walletBalance.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-all duration-300 group
                        ${
                          isActive
                            ? 'bg-accent-primary/20 text-accent-primary'
                            : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 w-1 h-8 bg-accent-primary rounded-r-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-dark-800/50">
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg
                text-gray-400 hover:bg-dark-800 hover:text-white
                transition-all duration-300"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-dark-900 border-b border-dark-800/50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="font-display font-semibold text-lg text-white">
              Dashboard
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;