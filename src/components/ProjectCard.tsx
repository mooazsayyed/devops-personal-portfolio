import React from "react";

interface ProjectCardProps {
  title: string;
  techStack: string[];
  description: string;
  architectureDiagram: string;
  readMoreLink: string;
  githubLink?: string;
  docsLink?: string;
}

export default function ProjectCard({
  title,
  techStack,
  description,
  architectureDiagram,
  readMoreLink,
  githubLink,
  docsLink,
}: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col p-4 rounded-xl shadow-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/90 text-white border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-cyan-400/25 hover:shadow-2xl backdrop-blur-sm w-full max-w-sm mx-auto h-[420px]">
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={architectureDiagram}
          alt={title}
          className="w-full h-36 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 line-clamp-2 leading-tight relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow relative z-10">
        {description}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-slate-800/70 border border-blue-500/30 px-2 py-1 rounded-md text-xs text-cyan-300 hover:bg-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto relative z-10">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 flex-1 px-2 py-2 rounded-lg border border-slate-600/50 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-400/70 hover:bg-cyan-400/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        )}

        {docsLink && (
          <a
            href={docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 flex-1 px-2 py-2 rounded-lg border border-slate-600/50 text-xs font-medium text-slate-300 hover:text-white hover:border-blue-400/70 hover:bg-blue-400/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Docs</span>
          </a>
        )}

        <a
          href={readMoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 flex-1 px-2 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-bold text-white hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30"
        >
          <span>Read More</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}