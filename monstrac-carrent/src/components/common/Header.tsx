import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/cars' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-xl border-b border-dark-800/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container-max section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-primary/20 blur-xl group-hover:bg-accent-primary/30 transition-colors duration-300" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <svg
                  className="w-10 h-10"
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
              </motion.div>
            </div>
            <span className="font-display font-bold text-xl text-white group-hover:text-accent-primary transition-colors duration-300">
              Monstrac <span className="text-accent-primary">CarRent</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <UserCircleIcon className="w-6 h-6" />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary py-2 px-5 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-b border-dark-800/50 shadow-lg"
            >
              <div className="container-max section-padding py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-dark-800/50 space-y-3">
                  {user ? (
                    <>
                      <Link
                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 py-2"
                      >
                        <UserCircleIcon className="w-6 h-6" />
                        <span className="font-medium">{user.name}</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="btn-secondary w-full py-2 text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center btn-secondary w-full py-2 text-sm"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center btn-primary w-full py-2 text-sm"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;