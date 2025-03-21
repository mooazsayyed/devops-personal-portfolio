import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, GitBranch, Database, Cog, LineChart, Shield, 
  Server, Network, Cpu, Lock, Zap, Code2, Boxes, 
  Settings, Activity, Terminal, GitCommit, Layers,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: React.ReactNode;
  description: string;
  relatedSkills: string[];
  color: string;
}

const skills: SkillNode[] = [
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'Infrastructure',
    proficiency: 95,
    icon: <Boxes className="w-6 h-6" />,
    description: 'Infrastructure as Code (IaC) tool for building, changing, and versioning cloud and on-premises resources safely and efficiently.',
    relatedSkills: ['aws', 'azure', 'gcp', 'kubernetes'],
    color: '#7B42F6'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Container',
    proficiency: 90,
    icon: <Layers className="w-6 h-6" />,
    description: 'Container orchestration platform for automating deployment, scaling, and management of containerized applications.',
    relatedSkills: ['docker', 'helm', 'prometheus', 'grafana'],
    color: '#3B82F6'
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'CI/CD',
    proficiency: 88,
    icon: <GitCommit className="w-6 h-6" />,
    description: 'Open-source automation server for building, deploying, and automating any project.',
    relatedSkills: ['docker', 'git', 'sonarqube', 'nexus'],
    color: '#EC4899'
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    category: 'Monitoring',
    proficiency: 92,
    icon: <Activity className="w-6 h-6" />,
    description: 'Systems and service monitoring toolkit for collecting and querying metrics as time series data.',
    relatedSkills: ['grafana', 'alertmanager', 'kubernetes'],
    color: '#10B981'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    proficiency: 95,
    icon: <Cloud className="w-6 h-6" />,
    description: 'Comprehensive cloud computing platform offering over 200 fully featured services from data centers globally.',
    relatedSkills: ['terraform', 'ecs', 'lambda', 'cloudwatch'],
    color: '#F59E0B'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Container',
    proficiency: 90,
    icon: <Boxes className="w-6 h-6" />,
    description: 'Platform for developing, shipping, and running applications in containers.',
    relatedSkills: ['kubernetes', 'jenkins', 'gitlab'],
    color: '#3B82F6'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'Monitoring',
    proficiency: 85,
    icon: <LineChart className="w-6 h-6" />,
    description: 'Open-source analytics and visualization platform for metrics, logs, and traces.',
    relatedSkills: ['prometheus', 'elasticsearch', 'influxdb'],
    color: '#F43F5E'
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI',
    category: 'CI/CD',
    proficiency: 88,
    icon: <GitBranch className="w-6 h-6" />,
    description: 'Continuous Integration/Continuous Deployment platform integrated with GitLab.',
    relatedSkills: ['docker', 'kubernetes', 'helm'],
    color: '#8B5CF6'
  }
];

interface NodeProps {
  node: SkillNode;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  position: { x: number; y: number };
}

const Node: React.FC<NodeProps> = ({ node, isHovered, onHover, onClick, position }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: isHovered ? 1.1 : 1,
        x: position.x,
        y: position.y
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute cursor-pointer"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className="relative">
        {/* Neon Glow Effect */}
        <div 
          className="absolute inset-0 rounded-lg blur-lg opacity-50"
          style={{ 
            backgroundColor: node.color,
            filter: `blur(8px) brightness(${node.proficiency / 100})`
          }}
        />
        
        {/* Node Card */}
        <div className="relative backdrop-blur-md bg-white/5 rounded-lg p-4 border border-white/10
          hover:border-blue-400/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${node.color}20` }}>
              {React.cloneElement(node.icon as React.ReactElement, {
                className: "w-6 h-6",
                style: { color: node.color }
              })}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{node.name}</h3>
              <p className="text-sm text-gray-400">{node.category}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isActive: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ from, to, isActive }) => {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={isActive ? "#3B82F6" : "#4B5563"}
      strokeWidth={isActive ? 3 : 2}
      className="transition-all duration-300"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: 1,
        opacity: isActive ? 1 : 0.7,
        filter: isActive 
          ? 'drop-shadow(0 0 12px #3B82F6) drop-shadow(0 0 8px #3B82F6)' 
          : 'drop-shadow(0 0 4px #4B5563) drop-shadow(0 0 2px #4B5563)'
      }}
      transition={{ duration: 0.5 }}
    />
  );
};

interface DetailModalProps {
  node: SkillNode | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-blue-900/90 to-purple-900/90
          rounded-lg p-6 border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${node.color}20` }}>
            {React.cloneElement(node.icon as React.ReactElement, {
              className: "w-8 h-8",
              style: { color: node.color }
            })}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{node.name}</h2>
            <p className="text-gray-400">{node.category}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Proficiency</h3>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${node.proficiency}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: node.color }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300">{node.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Related Skills</h3>
            <div className="flex flex-wrap gap-2">
              {node.relatedSkills.map(skillId => {
                const skill = skills.find(s => s.id === skillId);
                if (!skill) return null;
                return (
                  <span
                    key={skillId}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${skill.color}20`,
                      color: skill.color
                    }}
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SkillsNetwork: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
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

  const calculatePositions = () => {
    const positions: { [key: string]: { x: number; y: number } } = {};
    const radius = 350;
    const centerX = (window.innerWidth / 2) - 300;
    const centerY = (window.innerHeight / 2) - 150;

    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI;
      positions[skill.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };

      // Special case adjustments
      if (skill.id === 'grafana') {
        positions[skill.id].y += 50;
      }
      
      if (skill.id === 'kubernetes' || skill.id === 'prometheus') {
        positions[skill.id].y -= 50;
      }
    });

    return positions;
  };

  const positions = calculatePositions();

  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentSlide(prev => (prev > 0 ? prev - 1 : skills.length - 1));
    } else {
      setCurrentSlide(prev => (prev < skills.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {isMobile ? (
          // Mobile Carousel
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: -currentSlide * 100 + '%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {skills.map((skill, index) => (
                  <div key={skill.id} className="w-full flex-shrink-0 px-4">
                    <div
                      className="relative cursor-pointer"
                      onClick={() => setSelectedNode(skill)}
                    >
                      <div className="relative">
                        <div 
                          className="absolute inset-0 rounded-lg blur-lg opacity-50"
                          style={{ 
                            backgroundColor: skill.color,
                            filter: `blur(8px) brightness(${skill.proficiency / 100})`
                          }}
                        />
                        
                        <div className="relative backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg" style={{ backgroundColor: `${skill.color}20` }}>
                              {React.cloneElement(skill.icon as React.ReactElement, {
                                className: "w-8 h-8",
                                style: { color: skill.color }
                              })}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                              <p className="text-gray-400">{skill.category}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Proficiency</h4>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: skill.color }}
                                />
                              </div>
                            </div>
                            
                            <p className="text-gray-300 text-sm">{skill.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
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
          // Desktop Network View
          <div className="relative h-[600px]" ref={containerRef}>
            {/* Centered Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                {/* Outer Ring */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse blur-xl" />
                {/* Inner Hub */}
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-ping" />
                  <div className="text-white text-center">
                    <div className="font-bold text-xl mb-1">DevOps</div>
                    <div className="text-sm text-blue-400">Skills Network</div>
                  </div>
                </div>
                {/* Rotating Rings */}
                <div className="absolute -inset-16 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute -inset-12 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              </div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                 linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>

            {/* Decorative Circles - adjusted for balance */}
            <div className="absolute left-10 top-10 w-32 h-32 rounded-full bg-blue-500/5 animate-pulse blur-xl" />
            <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-purple-500/5 animate-pulse blur-xl" />
            <div className="absolute right-20 top-20 w-24 h-24 rounded-full bg-cyan-500/5 animate-pulse blur-xl" />
            <div className="absolute left-20 bottom-20 w-36 h-36 rounded-full bg-indigo-500/5 animate-pulse blur-xl" />

            <svg className="absolute inset-0 w-full h-full">
              {skills.map(skill => (
                skill.relatedSkills.map(relatedId => {
                  const relatedSkill = skills.find(s => s.id === relatedId);
                  if (!relatedSkill) return null;
                  return (
                    <Connection
                      key={`${skill.id}-${relatedId}`}
                      from={positions[skill.id]}
                      to={positions[relatedId]}
                      isActive={hoveredNode === skill.id || hoveredNode === relatedId}
                    />
                  );
                })
              ))}
            </svg>

            {skills.map(skill => (
              <Node
                key={skill.id}
                node={skill}
                isHovered={hoveredNode === skill.id}
                onHover={setHoveredNode}
                onClick={() => setSelectedNode(skill)}
                position={positions[skill.id]}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedNode && (
          <DetailModal
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}; 