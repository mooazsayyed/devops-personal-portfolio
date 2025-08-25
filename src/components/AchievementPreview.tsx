import React from 'react';
import { Shield, Zap, Target, Award, TrendingUp, CheckCircle } from 'lucide-react';

interface Achievement {
    name: string;
    value: string | string[];
    description: string;
    icon: React.ReactNode;
}

export function DevOpsAchievements() {
    const achievements: Achievement[] = [
        {
            name: 'Infrastructure Automation',
            value: '100%',
            description: 'Fully automated deployments',
            icon: <Zap className="w-5 h-5 text-yellow-400" />
        },
        {
            name: 'Zero-Downtime Deployments',
            value: '99.9%',
            description: 'Reliability achieved',
            icon: <Shield className="w-5 h-5 text-green-400" />
        },
        {
            name: 'CI/CD Pipeline Efficiency',
            value: '85%',
            description: 'Faster delivery cycles',
            icon: <Target className="w-5 h-5 text-blue-400" />
        },
        {
            name: 'Container Orchestration Skills',
            value: ['K8s', 'EKS', 'AKS', 'GKE'],
            description: 'Production-grade clusters',
            icon: <Award className="w-5 h-5 text-purple-400" />
        },
        {
            name: 'Monitoring Coverage',
            value: '100%',
            description: 'Complete observability',
            icon: <TrendingUp className="w-5 h-5 text-cyan-400" />
        },
        {
            name: 'Security Compliance',
            value: ['SOC2', 'PCI DSS', 'DevSecOps'],
            description: 'Enterprise standards',
            icon: <CheckCircle className="w-5 h-5 text-red-400" />
        }
    ];

    return (
        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors duration-300"
                    >
                        <div className="flex-shrink-0">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm text-gray-400">{achievement.name}</p>
                                {Array.isArray(achievement.value) ? (
                                    <div className="flex gap-1 flex-wrap justify-end">
                                        {achievement.value.map((val, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] text-gray-300 font-medium"
                                            >
                                                {val}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-cyan-300 ml-2">{achievement.value}</p>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills Progress Bars */}
            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
                    <h4 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 px-4">
                        Core DevOps Skills
                    </h4>
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
                </div>
                {[
                    { skill: 'Cloud Architecture (AWS/Azure)', level: 95, color: 'from-cyan-500 to-blue-500' },
                    { skill: 'Kubernetes & Docker', level: 90, color: 'from-blue-500 to-purple-500' },
                    { skill: 'Infrastructure as Code', level: 88, color: 'from-purple-500 to-pink-500' },
                    { skill: 'CI/CD Automation', level: 92, color: 'from-green-500 to-cyan-500' }
                ].map((item, index) => (
                    <div key={index} className="group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                                {item.skill}
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="text-cyan-400 font-medium text-sm">{item.level}%</span>
                            </div>
                        </div>
                        <div className="relative h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/5">
                            <div
                                className={`h-full bg-gradient-to-r ${item.color} rounded-full relative transition-all duration-1000 ease-out shadow-md`}
                                style={{
                                    width: `${item.level}%`
                                }}
                            >
                                <div
                                    className="absolute top-0 left-0 w-full h-full opacity-30"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        animation: `shimmer 2s ease-in-out ${index * 0.5}s infinite`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}