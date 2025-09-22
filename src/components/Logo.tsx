import React from 'react';
import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <motion.div
      className="flex items-center gap-1.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-400"
      >
        {/* Infinity symbol representing continuous integration/deployment */}
        <motion.path
          d="M14 20C14 23.3137 16.6863 26 20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20Z"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Gear icon representing automation */}
        <motion.path
          d="M20 11.5L23 8.5L26 11.5L23 14.5L20 11.5Z"
          fill="currentColor"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity }
          }}
        />

        {/* Cloud symbol */}
        <motion.path
          d="M28.5 25.5C31 25.5 33 23.5 33 21C33 18.5 31 16.5 28.5 16.5C28.2 14.5 26.5 13 24.5 13C23.5 13 22.7 13.3 22 13.9C21.3 11.6 19.2 10 16.7 10C13.5 10 11 12.5 11 15.7C11 16 11 16.4 11.1 16.7C9.3 17.4 8 19.1 8 21.2C8 23.9 10.1 26 12.8 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      <div className="flex flex-col -space-y-1">
        <motion.span
          className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          MOOAZ SAYYED
        </motion.span>
        <motion.span
          className="text-[10px] text-gray-400"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          DevOps Engineer
        </motion.span>
      </div>
    </motion.div>
  );
};