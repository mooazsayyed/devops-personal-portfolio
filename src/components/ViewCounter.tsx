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
        // Use a simpler namespace that doesn't include dots
        const namespace = 'mooaz-portfolio';
        const key = 'views';

        // First, try to get the current views
        const getResponse = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
        const getData = await getResponse.json();
        
        if (getData.value === undefined) {
          // If the namespace doesn't exist, create it
          const createResponse = await fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`);
          const createData = await createResponse.json();
          
          if (createData.status === 200) {
            setViews(0);
          } else {
            throw new Error('Failed to create counter');
          }
        } else {
          setViews(getData.value);
        }

        // Then, increment the counter
        await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
      } catch (error) {
        console.error('Error updating views:', error);
        setError('Failed to load views');
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