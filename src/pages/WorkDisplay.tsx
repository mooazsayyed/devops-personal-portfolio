import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Cloud, GitBranch, Database, Shield, LineChart, Github, Book, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface WorkItem {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  link?: string;
  github?: string;
  docs?: string;
  image?: string;
}

const workItems: WorkItem[] = [
  {
    title: "Production-Grade 3-Tier E-Commerce Deployment on Amazon EKS with Helm, Ingress, Domain Load Balancing, SSL/TLS, and Autoscaling",
    description: "Automated deployment and management of production-grade Kubernetes clusters with GitOps workflows and comprehensive monitoring solutions.",
    technologies: ["Terraform", "AWS EKS", "Helm", "ArgoCD", "Jenkins", "Prometheus", "Grafana", "GIT", "Github"],
    icon: <Cloud className="w-6 h-6 text-emerald-400" />,
    github: "https://github.com/mooazsayyed/Production-Grade-DevOps-Application-Deployment",
    docs: "https://blog.mooazsayyed.live/production-grade-3-tier-e-commerce-deployment-on-amazon-eks-with-helm-ingress-domain-load-balancing-ssltls-and-autoscaling",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1755963135135/48b72d02-847c-4261-b794-392f646ce13e.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm"
  },
  {
    title: "End to End CI/CD Pipeline for Java Application",
    description: "Built a comprehensive CI/CD pipeline using Jenkins with automated testing, security scanning, and monitoring for seamless deployment workflows.",
    technologies: ["Jenkins", "Docker", "SonarQube", "Prometheus", "ArgoCD", "Kubernetes", "Trivy"],
    icon: <GitBranch className="w-6 h-6 text-violet-400" />,
    link: "https://blog.mooazsayyed.live/production-level-cicd-pipeline-with-jenkins-sonarqube-argocd-and-monitoring",
    github: "https://github.com/example/cicd-platform",
    docs: "https://blog.mooazsayyed.live/production-level-cicd-pipeline-with-jenkins-sonarqube-argocd-and-monitoring",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1755798383076/9c493aad-f72a-4e55-887c-46655918bf3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
  },
  {
    title: "Production Grade Jenkins Monitoring with Prometheus, Grafana, InfluxDB",
    description: "Implemented a comprehensive monitoring solution for Jenkins Server with custom dashboards, alerting systems, and performance analytics.",
    technologies: ["Prometheus", "Grafana", "ELK Stack", "AlertManager", "InfluxDB"],
    icon: <LineChart className="w-6 h-6 text-amber-400" />,
    github: "https://github.com/mooazsayyed/Production-Grade-Jenkins-Monitoring",
    docs: "https://blog.mooazsayyed.live/production-grade-jenkins-monitoring-with-prometheus-grafana-influxdb",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1756134007498/7dcd2746-17b5-4377-a87c-895be53c8083.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm"
  },
  {
    title: "Deploying a Ruby on Rails WebApp on Kubernetes with ArgoCD & Tekton",
    description: "Deployed a ruby on rails application on Kubernetes with CI/CD pipeline using Tekton with advanced security patterns.",
    technologies: ["Ruby on Rails", "Kubernetes", "ArgoCD", "Tekton", "Postgres"],
    icon: <LineChart className="w-6 h-6 text-amber-400" />,
    github: "https://github.com/mooazsayyed/devops_work",
    docs: "https://sayyedmooaz.medium.com/is-deploying-a-ruby-on-rails-app-on-kubernetes-with-argocd-tekton-a-devops-focused-walkthrough-4e54e8a1b223",
    image: "https://drive.google.com/file/d/12FlYVbKTHpXVCZdi6MrcNIq4Z7OlnCs9/view?usp=sharing"
  }
];

const allTags = ["All", ...new Set(workItems.flatMap(item => item.technologies))];

export default function WorkDisplay() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleTagClick = (tag: string) => {
    if (tag === "All") {
      setSelectedTags(["All"]);
    } else {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags.filter(t => t !== "All"), tag];
      setSelectedTags(newTags.length > 0 ? newTags : ["All"]);
    }
  };

  const clearFilters = () => setSelectedTags(["All"]);

  const filteredItems =
    selectedTags.includes("All") || selectedTags.length === 0
      ? workItems
      : workItems.filter(item =>
        selectedTags.every(tag => item.technologies.includes(tag))
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 group flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-gray-900/40 rounded-2xl border border-gray-700/50 hover:border-emerald-400/50 hover:bg-gray-800/60 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-400/20"
      >
        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="font-medium">Back to Portfolio</span>
      </Link>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
              My Work
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-violet-400 to-amber-400 rounded-full mt-4 opacity-80"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Explore my journey through <span className="text-emerald-400 font-semibold">infrastructure automation</span>,
            <span className="text-violet-400 font-semibold"> CI/CD pipelines</span>, and
            <span className="text-amber-400 font-semibold"> cloud architecture</span>
          </p>
        </motion.div>

        {/* Tag Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => handleTagClick(tag)}
              className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${selectedTags.includes(tag)
                ? "bg-gradient-to-r from-emerald-500/20 to-violet-500/20 text-white border border-emerald-400/50 shadow-lg shadow-emerald-400/25"
                : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600/80 hover:bg-gray-700/50"
                }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tag}
                {selectedTags.includes(tag) && tag !== "All" && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    }}
                    className="ml-1 w-4 h-4 rounded-full bg-red-500/80 text-white text-xs flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer"
                  >
                    ×
                  </span>
                )}
              </span>
              {selectedTags.includes(tag) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 rounded-full"
                />
              )}
            </motion.button>
          ))}
          {selectedTags.length > 1 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white text-sm font-medium hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              Clear Filters
            </motion.button>
          )}
        </motion.div>

        {/* Work Items Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 h-[420px] flex flex-col">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-violet-500/3 to-amber-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Image Section */}
                {item.image && (
                  <div className="relative overflow-hidden rounded-t-2xl h-40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>

                    {/* Icon Overlay */}
                    <div className="absolute top-2 right-2">
                      <div className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="relative p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-gray-100 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-3 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300 line-clamp-2 flex-grow">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                        className="px-2 py-1 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white hover:border-gray-600/80 transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {item.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-700/60 rounded-lg text-xs text-gray-400">
                        +{item.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-xs font-medium"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {item.docs && (
                      <a
                        href={item.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 hover:from-emerald-500/30 hover:to-violet-500/30 backdrop-blur-sm border border-emerald-400/30 hover:border-emerald-400/50 rounded-lg text-white font-medium transition-all duration-300 text-xs"
                      >
                        <Book className="w-4 h-4" />
                        <span>Docs</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-transparent group-hover:border-emerald-400/30"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
              <Code2 className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 border border-emerald-400/30 rounded-xl text-white hover:from-emerald-500/30 hover:to-violet-500/30 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}