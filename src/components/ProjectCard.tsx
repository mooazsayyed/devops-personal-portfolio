import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  techStack: string[];
  description: string;
  architectureDiagram: string;
  readMoreLink: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  techStack,
  description,
  architectureDiagram,
  readMoreLink,
}) => {
  return (
    <div className="group perspective">
      <div className="relative h-full transform-gpu transition-all duration-500 group-hover:rotate-y-12">
        {/* Front of card */}
        <div className="absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md border border-white/10">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-gray-300 mb-6">
            {description}
          </p>

          <a
            href={readMoreLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Read More</span>
          </a>
        </div>

        {/* Back of card (Architecture Diagram) */}
        <div className="absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md border border-white/10 rotate-y-180">
          <div className="relative w-full h-full">
            <img
              src={architectureDiagram}
              alt={`${title} Architecture`}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}; 