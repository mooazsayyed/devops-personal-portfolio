import React, { useState, useEffect } from 'react';

interface Command {
  command: string;
  output: string | string[];
  delay: number;
}

export function Terminal() {
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const commands: Command[] = [
    {
      command: 'whoami',
      output: 'mooaz@devops ~ Devops Engineer Aspirant ',
      delay: 1000
    },
    {
      command: 'ls -techstack',
      output: [
        'Cloud/',
        '├── AWS',
        '├── Azure',
        '└── GCP',
        '',
        'CI-CD/',
        '├── Jenkins',
        '├── GitHub-Actions',
        '└── Gitlab',
        '',
        'Infrastructure and Automation/',
        '├── Terraform',
        '├── Ansible',
        '├── Kubernetes',
        '└── Docker',
        '',
        'Monitoring and Logging/',
        '├── Prometheus',
        '├── Grafana',
        '└── ELK Stack',
      ],
      delay: 2000
    }
  ];

  useEffect(() => {
    if (currentIndex < commands.length) {
      const timer = setTimeout(() => {
        setCommandHistory(prev => [...prev, commands[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, commands[currentIndex].delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm leading-relaxed w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="space-y-2">
        {commandHistory.map((cmd, index) => (
          <div key={index}>
            <div className="text-green-400">
              <span className="text-blue-400">➜</span> ~ $ {cmd.command}
            </div>
            <div className="text-gray-300 ml-4">
              {Array.isArray(cmd.output) ? (
                cmd.output.map((line, i) => (
                  <div key={i} className="font-mono">{line}</div>
                ))
              ) : (
                cmd.output
              )}
            </div>
          </div>
        ))}
        <div className="text-green-400">
          <span className="text-blue-400">➜</span> ~ $ <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}