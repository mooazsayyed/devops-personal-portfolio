import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export const ViewCounter: React.FC = () => {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateViews = async () => {
      try {
        // First, get the current views
        const response = await fetch('https://api.countapi.xyz/get/mooazsayyed.live/views');
        const data = await response.json();
        setViews(data.value);

        // Then, increment the counter
        await fetch('https://api.countapi.xyz/hit/mooazsayyed.live/views');
      } catch (error) {
        console.error('Error updating views:', error);
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
        {isLoading ? 'Loading...' : `${views?.toLocaleString()} views`}
      </span>
    </motion.div>
  );
}; 