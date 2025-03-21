import React from 'react';
import { LineChart, BarChart, Activity } from 'lucide-react';

interface Metric {
  name: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function DashboardPreview() {
  const metrics: Metric[] = [
    { name: 'Deployment Success Rate', value: '99.9%', change: 0.7, icon: <Activity className="w-5 h-5 text-green-400" /> },
    { name: 'Average Response Time', value: '187ms', change: -12.3, icon: <LineChart className="w-5 h-5 text-blue-400" /> },
    { name: 'Infrastructure Health', value: '98.5%', change: 1.2, icon: <BarChart className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-cyan-400 mb-6">Live Metrics Dashboard</h3>
      <div className="grid gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-black/20">
            <div className="flex items-center gap-3">
              {metric.icon}
              <div>
                <p className="text-sm text-gray-400">{metric.name}</p>
                <p className="text-xl font-semibold text-white">{metric.value}</p>
              </div>
            </div>
            <div className={`text-sm ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
            </div>
          </div>
        ))}
      </div>
      
      {/* Mock Graph */}
      <div className="mt-6 h-48 rounded-lg bg-black/20 p-4">
        <div className="h-full w-full flex items-end justify-between gap-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-full bg-cyan-400/30 rounded-t"
              style={{
                height: `${Math.random() * 60 + 20}%`,
                animation: `pulse 2s infinite ${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}