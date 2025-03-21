import React from 'react';

interface TechCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export function TechCard({ title, items, icon }: TechCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-cyan-400">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-300 group-hover:text-white transition-colors">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}