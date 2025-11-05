import React, { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: 1,
        title: 'Consultation',
        description: 'We start by understanding your business needs, challenges, and objectives to identify the right AI solution.',
        gradient: 'from-blue-500 to-cyan-500',
        glowColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
        number: 2,
        title: 'Strategy & Design',
        description: 'Our team develops a tailored strategy and solution design focused on delivering measurable business outcomes.',
        gradient: 'from-purple-500 to-pink-500',
        glowColor: 'rgba(168, 85, 247, 0.15)',
    },
    {
        number: 3,
        title: 'Implementation',
        description: 'We build and deploy your custom AI solution with minimal disruption to your existing operations.',
        gradient: 'from-cyan-500 to-blue-500',
        glowColor: 'rgba(6, 182, 212, 0.15)',
    },
    {
        number: 4,
        title: 'Optimization',
        description: 'Continuous monitoring and refinement ensure your AI solution learns, adapts, and improves over time.',
        gradient: 'from-violet-500 to-purple-500',
        glowColor: 'rgba(139, 92, 246, 0.15)',
    },
];

const HowItWorksSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wider uppercase">
                            Our Process
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        How It Works
                    </h2>

                    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Our structured approach ensures seamless integration and maximum value from your AI investment
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, index) => (
                            <ProcessStep
                                key={index}
                                step={step}
                                index={index}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProcessStep = ({ step, index, isHovered, onHover, onLeave }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="relative group"
        >
            {/* Card */}
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full"
            >
                {/* Glow effect */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${step.glowColor}, transparent 70%)`,
                    }}
                />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-20`} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    {/* Number Badge */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 mx-auto"
                    >
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <span className="text-white font-bold text-2xl">{step.number}</span>

                            {/* Number glow */}
                            <motion.div
                                animate={{
                                    opacity: isHovered ? 0.6 : 0,
                                    scale: isHovered ? 1.3 : 1,
                                }}
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl`}
                                style={{ zIndex: -1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {step.description}
                    </p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                    animate={{
                        width: isHovered ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.gradient} rounded-b-2xl`}
                />
            </motion.div>

            {/* Arrow indicator (desktop only) */}
            {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 -right-3 z-20">
                    <motion.div
                        animate={{
                            x: isHovered ? [0, 5, 0] : 0,
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`w-6 h-6 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}
                    >
                        <span className="text-white text-xs font-bold">→</span>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default HowItWorksSection;