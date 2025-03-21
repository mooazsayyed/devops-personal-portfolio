import React from 'react';
import { Award, Star, Trophy } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  credentialId?: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
}

interface CertificationCardProps {
  certifications: Certification[];
  achievements: Achievement[];
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  certifications,
  achievements,
}) => {
  return (
    <div className="space-y-12">
      {/* Certifications Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Certifications
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={cert.badgeUrl}
                    alt={`${cert.name} Badge`}
                    className="w-16 h-16 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{cert.name}</h4>
                  <p className="text-sm text-gray-300">{cert.issuer}</p>
                  <p className="text-sm text-gray-400">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mt-1">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Achievements
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                  <p className="text-gray-300">{achievement.description}</p>
                  {achievement.date && (
                    <p className="text-sm text-gray-400 mt-2">{achievement.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 