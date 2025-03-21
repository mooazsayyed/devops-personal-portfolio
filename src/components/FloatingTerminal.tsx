import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

const commands = [
  {
    command: 'help',
    output: 'Available commands:\n  help     - Show this help message\n  about    - About the portfolio\n  skills   - View skills\n  contact  - Contact information\n  clear    - Clear terminal\n  exit     - Close terminal',
    delay: 500
  }
];

export const FloatingTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('FloatingTerminal component mounted');
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const command = currentCommand.toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands:\n  help     - Show this help message\n  about    - About the portfolio\n  skills   - View skills\n  contact  - Contact information\n  clear    - Clear terminal\n  exit     - Close terminal';
        break;
      case 'about':
        output = 'DevOps Engineer & SRE with expertise in cloud infrastructure, automation, and reliability engineering.';
        break;
      case 'skills':
        output = 'Core Skills:\n  - Cloud Platforms (AWS, Azure, GCP)\n  - Container Orchestration (Kubernetes)\n  - Infrastructure as Code (Terraform)\n  - CI/CD (Jenkins, GitHub Actions)\n  - Monitoring (Prometheus, Grafana)\n  - Scripting (Python, Shell)';
        break;
      case 'contact':
        output = 'Get in touch:\n  Email: sayyedmooaz@gmail.com\n  LinkedIn: linkedin.com/in/mooazsayyed\n  GitHub: github.com/mooazsayyed';
        break;
      case 'clear':
        setHistory([]);
        output = '';
        break;
      case 'exit':
        setIsOpen(false);
        output = '';
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    if (output) {
      setHistory(prev => [...prev, {
        command: currentCommand,
        output,
        timestamp: new Date()
      }]);
    }

    setCurrentCommand('');
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-4 right-4 z-[9999] p-2 rounded-full bg-blue-500 border-2 border-blue-400 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50"
        onClick={() => setIsOpen(true)}
      >
        <TerminalIcon className="w-5 h-5 text-white" />
      </motion.button>

      {/* Floating Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-20 right-4 z-[9999] w-[400px] bg-black/90 backdrop-blur-md rounded-lg border-2 border-blue-400 shadow-xl shadow-blue-500/50"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-t-lg border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 hover:bg-white/10 rounded"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button
                  className="p-1 hover:bg-white/10 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 300 }}
                  exit={{ height: 0 }}
                  className="relative overflow-hidden"
                >
                  <div
                    ref={terminalRef}
                    className="h-[300px] overflow-y-auto font-mono text-sm p-4 space-y-2"
                  >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    {/* Command History */}
                    <div className="relative space-y-2">
                      {history.map((entry, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400">$</span>
                            <span className="text-white">{entry.command}</span>
                          </div>
                          <div className="pl-6 text-gray-300 whitespace-pre-wrap">{entry.output}</div>
                        </div>
                      ))}

                      {/* Current Command Line */}
                      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400">$</span>
                        <input
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                          placeholder="Type a command..."
                          autoFocus
                        />
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 