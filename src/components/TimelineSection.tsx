import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, ExternalLink, ChevronLeft, ChevronRight, X, ArrowUp } from 'lucide-react';

interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image?: string;
  link?: string;
  certificates?: string[];
}

const education: TimelineEntry[] = [
  {
    id: 'edu-1',
    title: 'Bachelors in Computer Applications',
    subtitle: 'Symbiosis Institute of Computer Studies and Research',
    date: '2022 - 2025',
    description: 'Specialized in Cloud Computing and Distributed Systems',
    certificates: ['Azure Fundamentals']
  }
];

const experience: TimelineEntry[] = [
  {
    id: 'exp-1',
    title: 'Devops Intern',
    subtitle: 'Finacplus.',
    date: '2024 - Present',
    description: 'Leading infrastructure automation and CI/CD initiatives',
    link: 'https://example.com/project1'
  },
  {
    id: 'exp-2',
    title: 'Web development Intern',
    subtitle: 'Cloud Systems Ltd.',
    date: '2024 - 2024',
    description: 'Implemented automated deployment pipelines and monitoring solutions',
    link: 'https://example.com/project2'
  }
];

interface TimelineCardProps {
  entry: TimelineEntry;
  isActive: boolean;
  onClick: () => void;
  side: 'left' | 'right';
}

const TimelineCard: React.FC<TimelineCardProps> = ({ entry, isActive, onClick, side }) => {
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300
        ${isActive ? 'scale-105' : 'scale-100'}`}
      onClick={onClick}
    >
      {/* Neon Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg
        blur-sm group-hover:blur-md transition-all duration-300
        ${isActive ? 'opacity-100' : 'opacity-50'}`} />
      
      {/* Card Content */}
      <div className="relative backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10
        hover:border-blue-400/50 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20
            ${side === 'left' ? 'order-1' : 'order-2'}`}>
            {side === 'left' ? (
              <GraduationCap className="w-8 h-8 text-blue-400" />
            ) : (
              <Briefcase className="w-8 h-8 text-purple-400" />
            )}
          </div>
          <div className={`flex-1 ${side === 'left' ? 'order-2' : 'order-1'}`}>
            <h3 className="text-xl font-bold text-white mb-2">{entry.title}</h3>
            <p className="text-base font-semibold text-gray-200 mb-2">{entry.subtitle}</p>
            <p className="text-base font-medium text-blue-400 mb-3">{entry.date}</p>
            <p className="text-base text-gray-100 leading-relaxed">{entry.description}</p>
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-medium text-blue-400 hover:text-blue-300 mt-4 transition-colors"
              >
                View Project <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  entries: TimelineEntry[];
  activeId: string | null;
  onEntryClick: (entry: TimelineEntry) => void;
  side: 'left' | 'right';
}

const Timeline: React.FC<TimelineProps> = ({ entries, activeId, onEntryClick, side }) => {
  return (
    <div className="relative">
      {/* Animated Flow Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5">
        {/* Main Gradient Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30" />
        
        {/* Animated Flow Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-flow">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-between">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative">
                  <ArrowUp
                    className="w-8 h-8 text-blue-400 animate-bounce"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))',
                      transform: 'scale(1.2)'
                    }}
                  />
                  <div className="absolute inset-0 animate-pulse bg-blue-400/30 rounded-full blur-md" />
                  <div className="absolute inset-0 animate-ping bg-blue-400/20 rounded-full blur-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline Entries */}
      <div className="space-y-8">
        {entries.map((entry, index) => (
          <div key={entry.id} className="relative">
            {/* Connector Dot with Pulse Effect */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
              bg-gradient-to-r from-blue-500 to-purple-500
              ${activeId === entry.id ? 'animate-pulse' : ''}`} />
            
            {/* Entry Card */}
            <div className={`${side === 'left' ? 'pr-8' : 'pl-8'}`}>
              <TimelineCard
                entry={entry}
                isActive={activeId === entry.id}
                onClick={() => onEntryClick(entry)}
                side={side}
              />
            </div>

            {/* Connecting Line Segment */}
            {index < entries.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-blue-500/30" />
                {/* Animated Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <ArrowUp
                      className="w-8 h-8 text-blue-400 animate-bounce"
                      style={{
                        filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))',
                        transform: 'scale(1.2)'
                      }}
                    />
                    <div className="absolute inset-0 animate-pulse bg-blue-400/30 rounded-full blur-md" />
                    <div className="absolute inset-0 animate-ping bg-blue-400/20 rounded-full blur-lg" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ModalProps {
  entry: TimelineEntry | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-blue-900/90 to-purple-900/90
        rounded-lg p-6 border border-white/10" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-4">{entry.title}</h2>
        <p className="text-gray-300 mb-4">{entry.description}</p>
        
        {entry.certificates && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Certificates</h3>
            <div className="flex flex-wrap gap-2">
              {entry.certificates.map((cert, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {entry.image && (
          <div className="mt-6">
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const TimelineSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll and intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleEntryClick = (entry: TimelineEntry) => {
    setSelectedEntry(entry);
  };

  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentSlide(prev => (prev > 0 ? prev - 1 : education.length - 1));
    } else {
      setCurrentSlide(prev => (prev < education.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <style>
        {`
          @keyframes flow {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100%);
            }
          }
          .animate-flow {
            animation: flow 2s linear infinite;
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) scale(1.2);
            }
            50% {
              transform: translateY(8px) scale(1.2);
            }
          }
          .animate-bounce {
            animation: bounce 0.8s ease-in-out infinite;
          }
          @keyframes ping {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .animate-ping {
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Education & Experience
          </h2>
          <p className="text-xl text-gray-300 mt-4">
            My journey through education and professional experience
          </p>
        </div>

        {isMobile ? (
          // Mobile Carousel with Flow Line
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 animate-flow">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-between">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="relative">
                        <ArrowUp
                          className="w-8 h-8 text-blue-400 animate-bounce"
                          style={{
                            animationDelay: `${i * 0.3}s`,
                            filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))',
                            transform: 'scale(1.2)'
                          }}
                        />
                        <div className="absolute inset-0 animate-pulse bg-blue-400/30 rounded-full blur-md" />
                        <div className="absolute inset-0 animate-ping bg-blue-400/20 rounded-full blur-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {education.map((entry, index) => (
                  <div key={entry.id} className="w-full flex-shrink-0 px-4">
                    <TimelineCard
                      entry={entry}
                      isActive={activeId === entry.id}
                      onClick={() => handleEntryClick(entry)}
                      side="left"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleSlideChange('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-900/30 backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => handleSlideChange('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-900/30 backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        ) : (
          // Desktop Split Screen with Flow Lines
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-8 text-center animate-pulse">
                Education
              </h3>
              <Timeline
                entries={education}
                activeId={activeId}
                onEntryClick={handleEntryClick}
                side="left"
              />
            </div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-8 text-center animate-pulse">
                Experience
              </h3>
              <Timeline
                entries={experience}
                activeId={activeId}
                onEntryClick={handleEntryClick}
                side="right"
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </section>
  );
};