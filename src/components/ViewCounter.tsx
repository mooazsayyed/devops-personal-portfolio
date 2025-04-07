import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export const ViewCounter: React.FC = () => {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        // Use counter.dev service
        const response = await fetch('https://counter.dev/api/counter?site=mooaz-portfolio');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && typeof data.count === 'number') {
          setViews(data.count);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error updating views:', error);
        setError(`Failed to load views: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    updateViews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10"
    >
      <Eye className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-gray-300">
        {isLoading ? 'Loading...' : error ? error : `${views?.toLocaleString() || 0} views`}
      </span>
    </motion.div>
  );
}; 