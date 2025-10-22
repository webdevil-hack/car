import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface NotificationToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
  };

  const colors = {
    success: 'from-green-500 to-green-600',
    error: 'from-red-500 to-red-600',
    warning: 'from-yellow-500 to-yellow-600',
    info: 'from-blue-500 to-blue-600'
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl border border-dark-600/50 bg-dark-800/90 backdrop-blur-sm shadow-2xl"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors[type]} opacity-10`} />
      
      {/* Content */}
      <div className="relative p-4 flex items-start space-x-3">
        <motion.div
          className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors[type]} flex items-center justify-center flex-shrink-0`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h4
            className="text-white font-semibold text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h4>
          {message && (
            <motion.p
              className="text-gray-300 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
          )}
        </div>
        
        <motion.button
          onClick={() => onClose(id)}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XCircleIcon className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className={`h-1 bg-gradient-to-r ${colors[type]} absolute bottom-0 left-0`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>;
  onClose: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onClose
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;