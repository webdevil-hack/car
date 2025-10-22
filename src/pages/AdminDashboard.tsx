import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">
              This will include car management, driver management, analytics, bookings, and more.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;