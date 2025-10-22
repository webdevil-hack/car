import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Car, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, formData.role);
      if (success) {
        toast.success('Login successful!');
        if (formData.role === 'admin' || formData.role === 'owner') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/customer');
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Car className="w-8 h-8 text-accent-primary" />
          <span className="text-2xl font-display font-bold glow-text">Monstrac CarRent</span>
        </Link>

        <div className="card p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 mb-8">Login to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Login as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'customer' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'customer'
                      ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                      : 'bg-dark-bg border-dark-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'admin'
                      ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                      : 'bg-dark-bg border-dark-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  Owner/Admin
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  className="input-field pl-11"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-400">
                <input type="checkbox" className="rounded border-dark-border bg-dark-card text-accent-primary focus:ring-accent-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-accent-primary hover:text-neon-purple transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-primary hover:text-neon-purple transition-colors font-semibold">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Quick Demo Info */}
        <div className="mt-6 card p-4 text-center text-sm text-gray-400">
          <p>
            <strong className="text-accent-primary">Demo:</strong> Use any email/password to login
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
