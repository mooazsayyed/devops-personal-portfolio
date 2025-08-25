import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Cloud, GitBranch, Database, Shield, LineChart, Github, Book } from 'lucide-react';
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
    description: "Automated deployment and management of production-grade Kubernetes clusters with GitOps.",
    technologies: ["Terraform", "AWS EKS", "Helm", "ArgoCD", "Jenkins", "Prometheus", "Grafana", "GIT", "Github"],
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    // link: "/projects/k8s-automation",
    github: "https://github.com/mooazsayyed/Production-Grade-DevOps-Application-Deployment",
    docs: "https://blog.mooazsayyed.live/production-grade-3-tier-e-commerce-deployment-on-amazon-eks-with-helm-ingress-domain-load-balancing-ssltls-and-autoscaling",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1755963135135/48b72d02-847c-4261-b794-392f646ce13e.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm"
  },
  {
    title: "End to End CI/CD Pipeline for Java Application",
    description: "Built a comprehensive CI/CD pipeline using Jenkins with automated testing, security scanning, and monitoring.",
    technologies: ["Jenkins", "Docker", "SonarQube", "Prometheus", "ArgoCD", "Kubernetes", "Trivy"],
    icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
    link: "/projects/cicd-platform",
    github: "https://github.com/example/cicd-platform",
    docs: "https://docs.example.com/cicd-platform",
    image: "/images/cicd.png"
  },
  {
    title: "Monitoring & Observability Stack",
    description: "Implemented a comprehensive monitoring solution with custom dashboards and alerting.",
    technologies: ["Prometheus", "Grafana", "ELK Stack", "AlertManager"],
    icon: <LineChart className="w-6 h-6 text-purple-400" />,
    link: "/projects/monitoring-stack",
    github: "https://github.com/example/monitoring-stack",
    docs: "https://docs.example.com/monitoring-stack",
    image: "/images/monitoring.png"
  }
];

// ✅ Collect unique tags
const allTags = ["All", ...new Set(workItems.flatMap(item => item.technologies))];

export default function WorkDisplay() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);

  const handleTagClick = (tag: string) => {
    if (tag === "All") {
      setSelectedTags(["All"]);
    } else {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag) // remove if already selected
        : [...selectedTags.filter(t => t !== "All"), tag]; // add new, remove "All"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white">
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Portfolio</span>
      </Link>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            My Work
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my major projects showcasing infrastructure automation, CI/CD pipelines, and cloud architecture.
          </p>
        </motion.div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-3 justify-center mt-10">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {tag}
              {selectedTags.includes(tag) && tag !== "All" && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  }}
                  className="ml-2 text-xs cursor-pointer"
                >
                  ✕
                </span>
              )}
            </button>
          ))}
          {selectedTags.length > 1 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full bg-red-500/80 text-white text-sm hover:bg-red-600 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Work Items Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-contain rounded-t-xl bg-black/5"
                  />

                )}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" /> GitHub
                        </a>
                      )}
                      {item.docs && (
                        <a
                          href={item.docs}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <Book className="w-5 h-5" /> Docs
                        </a>
                      )}
                      {item.link && (
                        <Link
                          to={item.link}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Learn more →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
