import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/dashboard/AnimatedCard';
import StatCard from '../components/dashboard/StatCard';
import AnimatedButton from '../components/dashboard/AnimatedButton';
import AnimatedTable from '../components/dashboard/AnimatedTable';
import ProgressRing from '../components/dashboard/ProgressRing';
import AnimatedChart from '../components/dashboard/AnimatedChart';
import NotificationContainer from '../components/dashboard/NotificationToast';
import { CardSkeleton, TableSkeleton } from '../components/dashboard/LoadingSkeleton';
import { 
  ChartBarIcon, 
  TruckIcon, 
  CalendarDaysIcon, 
  UsersIcon,
  StarIcon,
  TrendingUpIcon,
  SparklesIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const DashboardDemo: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const sampleData = [
    { label: 'Jan', value: 65, color: '#00D4FF' },
    { label: 'Feb', value: 80, color: '#8B5CF6' },
    { label: 'Mar', value: 45, color: '#EC4899' },
    { label: 'Apr', value: 90, color: '#10B981' },
    { label: 'May', value: 75, color: '#F59E0B' }
  ];

  const tableData = [
    { id: 1, name: 'BMW X5', status: 'available', price: 150, rating: 4.8 },
    { id: 2, name: 'Tesla Model 3', status: 'rented', price: 160, rating: 4.9 },
    { id: 3, name: 'Mercedes C-Class', status: 'maintenance', price: 140, rating: 4.7 },
    { id: 4, name: 'Audi A4', status: 'available', price: 120, rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-dark-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            🎨 Dashboard Components Demo
          </h1>
          <p className="text-gray-400 text-lg">
            Modern, animated dashboard components with sleek UI
          </p>
        </motion.div>

        {/* Notification Buttons */}
        <AnimatedCard className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Notification System</h2>
          <div className="flex flex-wrap gap-4">
            <AnimatedButton
              variant="success"
              onClick={() => addNotification('success', 'Success!', 'Operation completed successfully')}
            >
              Success Notification
            </AnimatedButton>
            <AnimatedButton
              variant="danger"
              onClick={() => addNotification('error', 'Error!', 'Something went wrong')}
            >
              Error Notification
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              onClick={() => addNotification('warning', 'Warning!', 'Please check your input')}
            >
              Warning Notification
            </AnimatedButton>
            <AnimatedButton
              variant="primary"
              onClick={() => addNotification('info', 'Info', 'Here is some information')}
            >
              Info Notification
            </AnimatedButton>
          </div>
        </AnimatedCard>

        {/* Stats Cards */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Statistics Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="$125,430"
              change={{ value: 12, type: 'increase' }}
              icon={<TrendingUpIcon className="w-6 h-6" />}
              color="green"
              delay={0}
            />
            <StatCard
              title="Total Bookings"
              value="1,234"
              change={{ value: 8, type: 'increase' }}
              icon={<CalendarDaysIcon className="w-6 h-6" />}
              color="blue"
              delay={0.1}
            />
            <StatCard
              title="Active Users"
              value="567"
              change={{ value: 5, type: 'decrease' }}
              icon={<UsersIcon className="w-6 h-6" />}
              color="purple"
              delay={0.2}
            />
            <StatCard
              title="Available Cars"
              value="89"
              icon={<TruckIcon className="w-6 h-6" />}
              color="orange"
              delay={0.3}
            />
          </div>
        </div>

        {/* Progress Rings */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Progress Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard className="p-6 text-center">
              <ProgressRing
                progress={75}
                size={120}
                color="#00D4FF"
                label="Car Utilization"
              />
            </AnimatedCard>
            <AnimatedCard className="p-6 text-center">
              <ProgressRing
                progress={60}
                size={120}
                color="#10B981"
                label="Customer Satisfaction"
              />
            </AnimatedCard>
            <AnimatedCard className="p-6 text-center">
              <ProgressRing
                progress={90}
                size={120}
                color="#8B5CF6"
                label="Booking Success Rate"
              />
            </AnimatedCard>
          </div>
        </div>

        {/* Charts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Animated Charts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Bar Chart</h3>
              <AnimatedChart data={sampleData} type="bar" height={200} />
            </AnimatedCard>
            <AnimatedCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Line Chart</h3>
              <AnimatedChart data={sampleData} type="line" height={200} />
            </AnimatedCard>
          </div>
        </div>

        {/* Animated Table */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Animated Table</h2>
          <AnimatedTable
            columns={[
              {
                key: 'name',
                label: 'Car Name',
                render: (value) => (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                      <TruckIcon className="w-4 h-4 text-neon-blue" />
                    </div>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                )
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    value === 'available' ? 'bg-green-500/20 text-green-400' :
                    value === 'rented' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {value}
                  </span>
                )
              },
              {
                key: 'price',
                label: 'Price',
                render: (value) => (
                  <span className="text-white font-semibold">${value}/day</span>
                )
              },
              {
                key: 'rating',
                label: 'Rating',
                render: (value) => (
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">{value}</span>
                  </div>
                )
              }
            ]}
            data={tableData}
          />
        </div>

        {/* Loading Skeletons */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Loading Skeletons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="mt-6">
            <TableSkeleton rows={3} columns={4} />
          </div>
        </div>

        {/* Button Variants */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Primary Buttons</h3>
              <div className="space-y-3">
                <AnimatedButton variant="primary" size="sm">Small</AnimatedButton>
                <AnimatedButton variant="primary" size="md">Medium</AnimatedButton>
                <AnimatedButton variant="primary" size="lg">Large</AnimatedButton>
                <AnimatedButton variant="primary" gradient glow>Gradient Glow</AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Secondary Buttons</h3>
              <div className="space-y-3">
                <AnimatedButton variant="secondary" size="sm">Small</AnimatedButton>
                <AnimatedButton variant="secondary" size="md">Medium</AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">Large</AnimatedButton>
                <AnimatedButton variant="secondary" icon={<BellIcon className="w-5 h-5" />}>With Icon</AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Status Buttons</h3>
              <div className="space-y-3">
                <AnimatedButton variant="success">Success</AnimatedButton>
                <AnimatedButton variant="danger">Danger</AnimatedButton>
                <AnimatedButton variant="ghost">Ghost</AnimatedButton>
                <AnimatedButton variant="primary" loading>Loading</AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Interactive</h3>
              <div className="space-y-3">
                <AnimatedButton 
                  variant="primary" 
                  onClick={() => addNotification('info', 'Button Clicked!', 'You clicked the button')}
                >
                  Click Me
                </AnimatedButton>
                <AnimatedButton variant="secondary" disabled>Disabled</AnimatedButton>
                <AnimatedButton variant="primary" gradient glow icon={<SparklesIcon className="w-5 h-5" />}>
                  Special
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </div>
  );
};

export default DashboardDemo;