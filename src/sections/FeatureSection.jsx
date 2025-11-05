import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const { top } = sectionRef.current.getBoundingClientRect();
                if (top < window.innerHeight * 0.85) {
                    sectionRef.current.classList.add('opacity-100', 'translate-y-0');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: '🤖',
            title: 'AI-Powered Automation',
            description: 'Eliminate repetitive tasks with intelligent automation that learns and adapts to your specific business needs.',
            gradient: 'from-blue-500 to-cyan-500',
            glowColor: 'rgba(59, 130, 246, 0.15)',
        },
        {
            icon: '💬',
            title: 'Custom AI Agents',
            description: 'Deploy intelligent conversational agents that understand context, provide accurate responses, and enhance customer engagement.',
            gradient: 'from-purple-500 to-pink-500',
            glowColor: 'rgba(168, 85, 247, 0.15)',
        },
        {
            icon: '📊',
            title: 'Intelligent Analytics',
            description: 'Turn raw data into actionable insights with AI-powered analytics that identify patterns, trends, and opportunities.',
            gradient: 'from-cyan-500 to-blue-500',
            glowColor: 'rgba(6, 182, 212, 0.15)',
        },
        {
            icon: '🔄',
            title: 'Workflow Integration',
            description: 'Seamlessly integrate our AI solutions with your existing tools and workflows for maximum efficiency and minimal disruption.',
            gradient: 'from-violet-500 to-purple-500',
            glowColor: 'rgba(139, 92, 246, 0.15)',
        },
        {
            icon: '🧠',
            title: 'Continuous Learning',
            description: 'Our AI systems evolve and improve over time, learning from interactions to deliver increasingly accurate and valuable results.',
            gradient: 'from-pink-500 to-rose-500',
            glowColor: 'rgba(236, 72, 153, 0.15)',
        },
        {
            icon: '🛠️',
            title: 'Custom Solutions',
            description: 'We develop tailored AI solutions designed specifically for your unique business challenges and objectives.',
            gradient: 'from-indigo-500 to-blue-500',
            glowColor: 'rgba(99, 102, 241, 0.15)',
        },
    ];

    return (
        <div className="relative py-24 overflow-hidden">
            <section
                ref={sectionRef}
                className="relative z-10 opacity-0 translate-y-4 transition-all duration-700"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-block mb-4"
                        >
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wider uppercase">
                                Our Capabilities
                            </span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Intelligent AI Solutions
                        </h2>

                        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Transform your business with advanced AI automation, analytics, and custom solutions built for the modern enterprise
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                feature={feature}
                                index={index}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ feature, index, isHovered, onHover, onLeave }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut"
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Glow effect on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.glowColor}, transparent 60%)`,
                    zIndex: 0
                }}
            />

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20`} />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.08 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-5"
                >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        {feature.icon}
                    </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                    {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                </p>

                {/* Learn more indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold"
                >
                    <motion.span
                        animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent text-base`}
                    >
                        →
                    </motion.span>
                </motion.div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

export default FeaturesSection;