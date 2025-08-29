import { useEffect, useState, useRef, ReactNode } from 'react';
import { Terminal as TerminalIcon, Download, Send, Code2, Cloud, GitBranch, Database, Cog, LineChart, Shield, Award, Star, Trophy, Github, Linkedin, Twitter, Phone, Mail } from 'lucide-react';
import { Terminal } from './components/Terminal';
import { FloatingTerminal } from './components/FloatingTerminal';
import { TechCard } from './components/TechCard';
// import { DashboardPreview } from './components/DashboardPreview';
import ProjectCard from "./components/ProjectCard";
import { CertificationCard } from './components/CertificationCard';
import { ContactForm } from './components/ContactForm';
import { Navbar } from './components/Navbar';
import { TimelineSection } from './components/TimelineSection';
import { SkillsNetwork } from './components/SkillsNetwork';
import { CICDWorkflow } from './components/CICDWorkflow';
import { DevOpsAchievements } from './components/AchievementPreview';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ViewCounter } from './components/ViewCounter';

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="font-mono font-bold">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.9]
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Circuit Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=2000")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Cloud Infrastructure Diagram Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-pulse" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />

            <g className="animate-[dash_20s_linear_infinite]">
              <path d="M20,50 Q50,20 80,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M20,70 Q50,40 80,70" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M40,20 Q50,50 60,80" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-20 gap-20">
        {/* Hero Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl w-full space-y-8 text-center backdrop-blur-sm bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Welcome Text */}
            <h1 className="text-4xl font-bold text-white mb-8">Welcome to My Portfolio</h1>

            {/* Terminal Icon with enhanced animation */}
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
            >
              <TerminalIcon className="w-12 h-12 text-emerald-400 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500" />
            </motion.div>

            {/* Hero Text with dramatic reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: [0, -5, 0],
                scale: 1
              }}
              transition={{
                duration: 1.2,
                ease: [0.6, -0.05, 0.01, 0.99],
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }
              }}
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
            >
              <TypewriterText text="I am Mooaz Sayyed – DevOps Engineer | SRE" />
            </motion.h1>

            {/* Subtitle with staggered reveal */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: "easeOut",
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  delay: 0.2
                }
              }}
              className="text-xl md:text-2xl text-gray-300 mt-6"
            >
              Automating Deployments. Ensuring Reliability. Scaling with Confidence.
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute -z-10 w-full h-full"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Glassmorphism Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link
              to="/work"
              className="group flex items-center gap-2 px-6 py-3 backdrop-blur-md bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>View My Work</span>
            </Link>

            <a
              href="/mooazsayyed_cv.pdf"
              download="mooazsayyed_cv.pdf"
              className="group flex items-center gap-2 px-6 py-3 backdrop-blur-md bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Download className="w-5 h-5 text-blue-400" />
              <span>Download Resume</span>
            </a>



            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="group flex items-center gap-2 px-6 py-3 backdrop-blur-md bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Send className="w-5 h-5 text-cyan-400" />
              <span>Contact Me</span>
            </button>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="max-w-6xl w-full space-y-16">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                About Me
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                As a DevOps Engineer, I specialize in building and maintaining scalable, resilient infrastructure.
                With expertise in cloud platforms, CI/CD automation, and infrastructure as code, I help teams deliver software faster and more reliably.
              </p>
            </div>
          </ScrollReveal>

          {/* Tech Stack Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.2}>
              <TechCard
                title="Cloud Platforms"
                items={['AWS', 'Azure', 'Google Cloud']}
                icon={<Cloud className="w-6 h-6 text-blue-400" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <TechCard
                title="CI/CD Tools"
                items={['Jenkins', 'GitHub Actions', 'Gitlab']}
                icon={<GitBranch className="w-6 h-6 text-cyan-400" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <TechCard
                title="Infrastructure"
                items={['Kubernetes', 'Terraform', 'Docker']}
                icon={<Database className="w-6 h-6 text-blue-400" />}
              />
            </ScrollReveal>
          </div>

          {/* Terminal Section */}
          <div className="mt-12">
            <Terminal />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-6xl w-full space-y-16">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Skills & Expertise
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Specialized in modern DevOps practices and tools, with a focus on automation, security, and scalability.
              </p>
            </div>
          </ScrollReveal>

          {/* New Interactive Skills Network */}
          <ScrollReveal delay={0.2}>
            <SkillsNetwork />
          </ScrollReveal>

          {/* Education & Experience Timeline */}
          <ScrollReveal delay={0.4}>
            <TimelineSection />
          </ScrollReveal>

          {/* Dashboard Preview */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              DevOps Skill Achievements
            </h3>
            <DevOpsAchievements />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl w-full space-y-8">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A collection of my major projects showcasing infrastructure automation, CI/CD pipelines, and cloud architecture.
              </p>
            </div>
          </ScrollReveal>

          {/* CI/CD Workflow Animation */}
          <ScrollReveal delay={0.2}>
            <div>
              <div className="w-full backdrop-blur-lg bg-black/20 rounded-xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Automated CI/CD Pipeline</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-400">Real-time visualization of our deployment workflow</p>
                    <div className="flex items-center gap-3 ml-auto">
                      <motion.div
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <div className="w-8 h-8">
                          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                            <path d="M3.04 12.294C3.04 7.15 7.2 3 12.34 3c5.14 0 9.3 4.15 9.3 9.294 0 5.143-4.16 9.294-9.3 9.294-5.14 0-9.3-4.15-9.3-9.294z" fill="#D33833" />
                            <path d="M4.667 12.294a7.674 7.674 0 1015.347 0 7.674 7.674 0 00-15.347 0z" fill="#fff" />
                            <path d="M12.34 5.897c-3.532 0-6.397 2.865-6.397 6.397 0 3.532 2.865 6.397 6.397 6.397 3.532 0 6.397-2.865 6.397-6.397 0-3.532-2.865-6.397-6.397-6.397z" fill="#D33833" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-black/60 px-2 py-1 rounded">Jenkins</span>
                      </motion.div>

                      <motion.div
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.3
                        }}
                      >
                        <div className="w-8 h-8">
                          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                            <path d="M12 21.6L7.2 10.8h9.6L12 21.6z" fill="#FC6D26" />
                            <path d="M12 21.6l4.8-10.8H22L12 21.6z" fill="#FCA326" />
                            <path d="M22 10.8l1.2 3.6c.1.4 0 .8-.2 1.1L12 21.6l10-10.8z" fill="#E24329" />
                            <path d="M22 10.8H16.8L19.2 3c.1-.4.7-.4.8 0L22 10.8z" fill="#FC6D26" />
                            <path d="M12 21.6L7.2 10.8H2L12 21.6z" fill="#FCA326" />
                            <path d="M2 10.8L.8 14.4c-.1.4 0 .8.2 1.1L12 21.6 2 10.8z" fill="#E24329" />
                            <path d="M2 10.8h5.2L4.8 3c-.1-.4-.7-.4-.8 0L2 10.8z" fill="#FC6D26" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-black/60 px-2 py-1 rounded">GitLab CI</span>
                      </motion.div>

                      <motion.div
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.6
                        }}
                      >
                        <div className="w-8 h-8">
                          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#ffffff" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-black/60 px-2 py-1 rounded">GitHub Actions</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-0">
                <CICDWorkflow />
              </div>
            </div>
          </ScrollReveal>
          {/* // Replace your projects section with this complete structure: */}

          <section className="py-16 px-4 max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
                SELECTED PROJECTS
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <ProjectCard
                title="Production-Grade 3-Tier E-Commerce Deployment on Amazon EKS with Helm, Ingress, Domain Load Balancing, SSL/TLS, and Autoscaling"
                techStack={['Terraform', 'AWS EKS', 'Helm', 'ArgoCD', 'Jenkins', 'Grafana', 'Prometheus', 'Docker', 'domain']}
                description="Automated deployment and management of production-grade Kubernetes clusters with GitOps."
                architectureDiagram="https://cdn.hashnode.com/res/hashnode/image/upload/v1755963135135/48b72d02-847c-4261-b794-392f646ce13e.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm"
                readMoreLink="https://blog.mooazsayyed.live/production-grade-3-tier-e-commerce-deployment-on-amazon-eks-with-helm-ingress-domain-load-balancing-ssltls-and-autoscaling"
                githubLink="https://github.com/mooazsayyed/Production-Grade-DevOps-Application-Deployment"
                docsLink="https://blog.mooazsayyed.live/production-grade-3-tier-e-commerce-deployment-on-amazon-eks-with-helm-ingress-domain-load-balancing-ssltls-and-autoscaling"
              />

              <ProjectCard
                title="Production Grade Jenkins Monitoring with Prometheus, Grafana, InfluxDB"
                techStack={['Jenkins', 'Docker', 'Prometheus', 'Grafana', 'InfluxDB']}
                description="Visualized Jenkins metrics and logs & built custom dashboards in Grafana using Promtheus,Influxdb and Jenkins Plugins."
                architectureDiagram="https://cdn.hashnode.com/res/hashnode/image/upload/v1756134007498/7dcd2746-17b5-4377-a87c-895be53c8083.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm"
                readMoreLink="https://blog.mooazsayyed.live/production-grade-jenkins-monitoring-with-prometheus-grafana-influxdb"
                githubLink="https://github.com/mooazsayyed/Production-Grade-Jenkins-Monitoring"
                docsLink="https://blog.mooazsayyed.live/production-grade-jenkins-monitoring-with-prometheus-grafana-influxdb"
              />

              <ProjectCard
                title="End To End Enterprise grade CI/CD Pipeline in Jenkins for Java Application"
                techStack={['Jenkins', 'Docker', 'Maven', "Trivy", 'Git/Github', 'ArgoCD', 'Kubernetes']}
                description="Multi Branch pipeline in Jenkins for a Java application that deploys to kubernetes via ArgoCD."
                architectureDiagram="https://cdn.hashnode.com/res/hashnode/image/upload/v1755798383076/9c493aad-f72a-4e55-887c-46655918bf3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                readMoreLink="https://blog.mooazsayyed.live/production-level-cicd-pipeline-with-jenkins-sonarqube-argocd-and-monitoring"
                githubLink="https://github.com/mooazsayyed/JavaApplication"
                docsLink="https://blog.mooazsayyed.live/production-level-cicd-pipeline-with-jenkins-sonarqube-argocd-and-monitoring"
              />
            </div>

            {/* View More Button */}
            <div className="text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-slate-800/80 to-blue-900/80 border border-cyan-400/30 text-white font-semibold hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm group"
              >
                <span>Check work page for more projects</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </section>

        {/* Certifications & Achievements Section */}
        <section id="certifications" className="max-w-6xl w-full space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Certifications & Achievements
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional certifications and notable achievements in the DevOps ecosystem.
            </p>
          </div>

          <CertificationCard
            certifications={[
              {
                name: "Microsoft Certified: Azure Fundamentals",
                issuer: "Microsoft Azure",
                date: "2024",
                badgeUrl: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
                credentialId: "A98BDCA0652B2A42"
              },
              // {
              //   name: "Certified Kubernetes Administrator",
              //   issuer: "Cloud Native Computing Foundation",
              //   date: "2023",
              //   badgeUrl: "/images/certifications/cka.png",
              //   credentialId: "CKA-123456"
              // },
              // {
              //   name: "HashiCorp Certified: Terraform Associate",
              //   issuer: "HashiCorp",
              //   date: "2023",
              //   badgeUrl: "/images/certifications/terraform.png",
              //   credentialId: "HCT-123456"
              // }
            ]}
            achievements={[
              {
                title: "Open Source Contributor",
                description: "Contributed to major open-source projects including Kubernetes, Terraform, and Prometheus.",
                icon: <Github className="w-6 h-6 text-white" />,
                date: "2023"
              },
              {
                title: "Community Speaker",
                description: "Regular speaker at DevOps and Cloud Native conferences, sharing expertise in infrastructure automation.",
                icon: <Award className="w-6 h-6 text-white" />,
                date: "2023"
              }
            ]}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-6xl w-full space-y-16">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Let's discuss how I can help you with your DevOps and infrastructure needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-8">
            {/* Contact Cards */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-md bg-white/5 rounded-lg border border-white/10 p-4 flex items-center gap-3 hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a href="ph:+91 9665398253" className="text-gray-300 hover:text-blue-400">
                    +91 9665398253
                  </a>
                </div>

                <div className="backdrop-blur-md bg-white/5 rounded-lg border border-white/10 p-4 flex items-center gap-3 hover:bg-white/10 transition-all">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:sayyedmooaz@gmail.com" className="text-gray-300 hover:text-blue-400">
                    sayyedmooaz@gmail.com
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.4}>
              <ContactForm
                onSubmit={(data) => {
                  // Handle form submission here
                  console.log('Form submitted:', data);
                }}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Floating Terminal */}
      <FloatingTerminal />

      {/* View Counter */}
      <ViewCounter />
    </div>
  );
}