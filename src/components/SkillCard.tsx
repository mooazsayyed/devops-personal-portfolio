import React from 'react';

interface SkillCardProps {
  title: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
  icon: React.ReactNode;
}

export function SkillCard({ title, skills, icon }: SkillCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-xl font-semibold text-cyan-400">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-cyan-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                style={{
                  width: `${skill.level}%`,
                  transition: 'width 1s ease-in-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}