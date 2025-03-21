import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  TestTube, 
  Box, 
  Cloud, 
  Terminal,
  CheckCircle2,
  GitCommit,
  Container,
  BarChart3
} from 'lucide-react';

interface Stage {
  id: string;
  title: string;
  icon: React.ReactNode;
  logs: string[];
  duration: number;
}

const stages: Stage[] = [
  {
    id: 'commit',
    title: 'Code Commit',
    icon: <GitCommit className="w-6 h-6" />,
    logs: [
      '> git add .',
      '> git commit -m "feat: add kubernetes deployment"',
      '> git push origin main',
      '✓ Changes pushed to repository'
    ],
    duration: 2000
  },
  {
    id: 'test',
    title: 'Automated Testing',
    icon: <TestTube className="w-6 h-6" />,
    logs: [
      '> Running unit tests...',
      '✓ API tests passed',
      '✓ Integration tests passed',
      '✓ Security scan completed'
    ],
    duration: 3000
  },
  {
    id: 'build',
    title: 'Build & Package',
    icon: <Box className="w-6 h-6" />,
    logs: [
      '> Building Docker image...',
      '> docker build -t app:latest .',
      '✓ Image built successfully',
      '✓ Pushing to registry'
    ],
    duration: 2500
  },
  {
    id: 'deploy',
    title: 'Deployment',
    icon: <Cloud className="w-6 h-6" />,
    logs: [
      '> kubectl apply -f deployment.yaml',
      '> Scaling replicas to 3',
      '✓ Deployment successful',
      '✓ Health checks passed'
    ],
    duration: 2500
  },
  {
    id: 'monitor',
    title: 'Monitoring',
    icon: <BarChart3 className="w-6 h-6" />,
    logs: [
      '> Checking metrics...',
      '✓ CPU usage: 12%',
      '✓ Memory usage: 45%',
      '✓ Response time: 120ms'
    ],
    duration: 2000
  }
];

const cicdTools = [
  {
    name: 'Jenkins',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M3.04 12.294C3.04 7.15 7.2 3 12.34 3c5.14 0 9.3 4.15 9.3 9.294 0 5.143-4.16 9.294-9.3 9.294-5.14 0-9.3-4.15-9.3-9.294z" fill="#D33833"/>
        <path d="M4.667 12.294a7.674 7.674 0 1015.347 0 7.674 7.674 0 00-15.347 0z" fill="#fff"/>
        <path d="M12.34 5.897c-3.532 0-6.397 2.865-6.397 6.397 0 3.532 2.865 6.397 6.397 6.397 3.532 0 6.397-2.865 6.397-6.397 0-3.532-2.865-6.397-6.397-6.397z" fill="#D33833"/>
      </svg>
    ),
    position: 'top-4 left-4'
  },
  {
    name: 'GitLab CI',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M12 21.6L7.2 10.8h9.6L12 21.6z" fill="#FC6D26"/>
        <path d="M12 21.6l4.8-10.8H22L12 21.6z" fill="#FCA326"/>
        <path d="M22 10.8l1.2 3.6c.1.4 0 .8-.2 1.1L12 21.6l10-10.8z" fill="#E24329"/>
        <path d="M22 10.8H16.8L19.2 3c.1-.4.7-.4.8 0L22 10.8z" fill="#FC6D26"/>
        <path d="M12 21.6L7.2 10.8H2L12 21.6z" fill="#FCA326"/>
        <path d="M2 10.8L.8 14.4c-.1.4 0 .8.2 1.1L12 21.6 2 10.8z" fill="#E24329"/>
        <path d="M2 10.8h5.2L4.8 3c-.1-.4-.7-.4-.8 0L2 10.8z" fill="#FC6D26"/>
      </svg>
    ),
    position: 'top-4 right-4'
  },
  {
    name: 'GitHub Actions',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#ffffff"/>
      </svg>
    ),
    position: 'bottom-4 left-1/2 transform -translate-x-1/2'
  }
];

export const CICDWorkflow: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length);
      }, stages[currentStage].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStage, isAnimating]);

  return (
    <div className="w-full py-8">
      {/* Main Pipeline View */}
      <div className="relative max-w-6xl mx-auto">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-md rounded-xl border border-white/10" />

        {/* Pipeline Stages */}
        <div className="relative p-6">
          {/* Stage Timeline */}
          <div className="flex justify-between mb-8">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex flex-col items-center relative"
              >
                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="absolute w-full h-0.5 top-5 left-1/2 bg-gradient-to-r from-blue-500/50 to-purple-500/50">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={{ width: "0%" }}
                      animate={{
                        width: currentStage > index ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                {/* Stage Icon */}
                <motion.div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                    ${currentStage === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : currentStage > index
                        ? 'bg-blue-500/50'
                        : 'bg-gray-700/50'
                    }`}
                  animate={{
                    scale: currentStage === index ? [1, 1.1, 1] : 1,
                    boxShadow: currentStage === index 
                      ? [
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 0 10px rgba(59, 130, 246, 0.2)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      : "none"
                  }}
                  transition={{
                    duration: 2,
                    repeat: currentStage === index ? Infinity : 0
                  }}
                >
                  {React.cloneElement(stage.icon as React.ReactElement, {
                    className: `w-5 h-5 text-white ${
                      currentStage >= index ? 'opacity-100' : 'opacity-50'
                    }`
                  })}
                </motion.div>

                {/* Stage Title */}
                <div className="mt-2 text-sm font-mono text-center">
                  <span className={`
                    ${currentStage === index 
                      ? 'text-blue-400' 
                      : currentStage > index
                        ? 'text-gray-300'
                        : 'text-gray-500'
                    }`}
                  >
                    {stage.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Log Terminal */}
          <div className="relative mt-8">
            <div className="bg-gray-900/80 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-1"
                >
                  {stages[currentStage].logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-gray-300"
                    >
                      {log.startsWith('✓') ? (
                        <span className="text-green-400">{log}</span>
                      ) : (
                        <span>{log}</span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%"
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%"
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
}; 