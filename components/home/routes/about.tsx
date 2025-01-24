"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/sitemap';
import { HoverEffect } from '../../ui/card-hover-effect';
import dynamic from 'next/dynamic';

const ClientSideFlipWords = dynamic(() => import('../../ui/flip-words').then(mod => mod.FlipWords), { ssr: false });
const ClientSideSparklesCore = dynamic(() => import('../../ui/sparkles').then(mod => mod.SparklesCore), { ssr: false });

const About: React.FC = () => {
  const hoverItems = [
    {
      title: "AI-Powered Automation",
      description: "Harness the power of artificial intelligence to automate complex workflows.",
      link: "/ai-automation",
    },
    {
      title: "Quantum Web Scraping",
      description: "Utilize quantum computing principles for unprecedented data extraction speeds.",
      link: "/quantum-scraping",
    },
    {
      title: "Predictive Analytics",
      description: "Forecast trends and make data-driven decisions with our advanced analytics engine.",
      link: "/predictive-analytics",
    },
    {
      title: "Blockchain Integration",
      description: "Ensure data integrity and traceability with our blockchain-powered solutions.",
      link: "/blockchain",
    },
    {
      title: "Neural Network Optimization",
      description: "Optimize your processes using our state-of-the-art neural network algorithms.",
      link: "/neural-optimization",
    },
    {
      title: "Quantum-Resistant Security",
      description: "Future-proof your data with our quantum-resistant encryption protocols.",
      link: "/quantum-security",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden text-white pt-24"
    >
     
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1
          className="text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          About {siteConfig.name}
        </motion.h1>

        <div className="mb-16">
          <ClientSideFlipWords words={siteConfig.description.split(' ')} />
        </div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center">Our Quantum Leap in Automation</h2>
          <p className="mb-6 text-xl text-center">
            At {siteConfig.name}, we're revolutionizing the digital landscape with quantum-inspired technologies:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <motion.li className="bg-white/10 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>Quantum-enhanced data extraction</motion.li>
            <motion.li className="bg-white/10 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>AI-driven task automation</motion.li>
            <motion.li className="bg-white/10 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>Blockchain-secured data integrity</motion.li>
            <motion.li className="bg-white/10 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>Neural network optimization</motion.li>
          </ul>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center">Why We're Light-Years Ahead</h2>
          <HoverEffect items={hoverItems} />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">Join Our Quantum Network</h2>
          <div className="flex justify-center space-x-6">
            {Object.entries(siteConfig.links).map(([key, value]) => (
              <motion.a
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-semibold hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <ClientSideSparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 pointer-events-none"
      />
    </motion.div>
  );
};

export default About;
