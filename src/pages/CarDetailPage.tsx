import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Car Detail Page
            </h1>
            <p className="text-gray-300">
              Car ID: {id}
            </p>
            <p className="text-gray-400 mt-4">
              This page will include 3D car viewer, detailed specifications, booking widget, and more.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetailPage;