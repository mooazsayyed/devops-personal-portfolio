import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Cloud, GitBranch, Database, Shield, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkItem {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  link?: string;
}

const workItems: WorkItem[] = [
  {
    title: "Kubernetes Cluster Automation",
    description: "Automated the deployment and management of production-grade Kubernetes clusters with GitOps practices.",
    technologies: ["Terraform", "AWS EKS", "Helm", "ArgoCD"],
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    link: "/projects/k8s-automation"
  },
  {
    title: "CI/CD Pipeline Platform",
    description: "Built a comprehensive CI/CD platform with automated testing, security scanning, and monitoring.",
    technologies: ["Jenkins", "Docker", "SonarQube", "Prometheus"],
    icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
    link: "/projects/cicd-platform"
  },
  {
    title: "Infrastructure as Code Framework",
    description: "Developed a reusable IaC framework for consistent infrastructure deployment across multiple cloud providers.",
    technologies: ["Terraform", "AWS", "Azure", "GCP"],
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    link: "/projects/iac-framework"
  },
  {
    title: "Security Automation Platform",
    description: "Created an automated security scanning and compliance platform for cloud infrastructure.",
    technologies: ["AWS Security Hub", "CloudFormation", "Lambda", "SNS"],
    icon: <Shield className="w-6 h-6 text-red-400" />,
    link: "/projects/security-platform"
  },
  {
    title: "Monitoring & Observability Stack",
    description: "Implemented a comprehensive monitoring solution with custom dashboards and alerting.",
    technologies: ["Prometheus", "Grafana", "ELK Stack", "AlertManager"],
    icon: <LineChart className="w-6 h-6 text-purple-400" />,
    link: "/projects/monitoring-stack"
  }
];

export default function WorkDisplay() {
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

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-20">
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

        {/* Work Items Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {workItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {item.link && (
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Learn more
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Link>
                    )}
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
