import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Customer Dashboard Pages
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import CustomerBookings from './pages/dashboard/CustomerBookings';
import CustomerWallet from './pages/dashboard/CustomerWallet';
import CustomerProfile from './pages/dashboard/CustomerProfile';
import CustomerReferrals from './pages/dashboard/CustomerReferrals';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCars from './pages/admin/AdminCars';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminFinance from './pages/admin/AdminFinance';
import AdminSettings from './pages/admin/AdminSettings';

// Auth Context Provider
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-950">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="cars" element={<CarsPage />} />
              <Route path="cars/:id" element={<CarDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Customer Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<CustomerDashboard />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="wallet" element={<CustomerWallet />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="referrals" element={<CustomerReferrals />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#18181b',
                color: '#f4f4f5',
                border: '1px solid #27272a',
              },
              success: {
                iconTheme: {
                  primary: '#00ff88',
                  secondary: '#18181b',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff0084',
                  secondary: '#18181b',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;