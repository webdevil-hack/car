import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import CarsListPage from './pages/CarsListPage';
import CarDetailPage from './pages/CarDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-dark-card text-white border border-dark-border',
            style: {
              background: '#13131a',
              color: '#fff',
              border: '1px solid #2a2a35',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsListPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
