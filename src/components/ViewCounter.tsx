import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export const ViewCounter: React.FC = () => {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/mooaz/portfolio/up');
        console.log('Raw response:', response);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Counter API response:', data);

        if (data && typeof data.count === 'number') {
          setViews(data.count);
        } else {
          console.error('Unexpected API response format:', data);
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching view count:', err);
        setViews(0);
        setError('Could not fetch views');
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10"
      title="Total site views"
    >
      <Eye className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-gray-300">
        {isLoading ? 'Loading...' : `${views?.toLocaleString() || 0} views`}
      </span>
    </motion.div>
  );
};

export const FreeVisitorCounter: React.FC = () => (
  <div className="fixed bottom-4 right-4 z-50">
    <a href="http://www.freevisitorcounters.com" target="_blank" rel="noopener noreferrer">
      Free Counter
    </a>
    <iframe
      src="https://www.freevisitorcounters.com/en/home/counter/1332889/t/2"
      style={{ border: 'none', width: 100, height: 30, background: 'transparent' }}
      title="Free Visitor Counter"
      scrolling="no"
      frameBorder="0"
    ></iframe>
  </div>
);
