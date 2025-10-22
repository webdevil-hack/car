import React from 'react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface AnimatedTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  onRowClick?: (row: any) => void;
  loading?: boolean;
}

const AnimatedTable: React.FC<AnimatedTableProps> = ({
  columns,
  data,
  className = '',
  onRowClick,
  loading = false
}) => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-16 bg-dark-700/50 rounded-xl animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-dark-800/60 rounded-2xl border border-dark-700/50 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <motion.tr
              className="bg-dark-700/50 border-b border-dark-600/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {columns.map((column, index) => (
                <motion.th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleSort(column.key)}
                    disabled={!column.sortable}
                    className={`
                      flex items-center space-x-2 hover:text-white transition-colors
                      ${column.sortable ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <span>{column.label}</span>
                    {column.sortable && (
                      <motion.div
                        className="text-xs"
                        animate={{
                          rotate: sortConfig?.key === column.key && sortConfig.direction === 'desc' ? 180 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        ↑
                      </motion.div>
                    )}
                  </button>
                </motion.th>
              ))}
            </motion.tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                className={`
                  border-b border-dark-600/30 hover:bg-dark-700/30 transition-all duration-200
                  ${onRowClick ? 'cursor-pointer' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                whileHover={{ x: 4 }}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <motion.td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIndex * 0.05 + colIndex * 0.02 }}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimatedTable;