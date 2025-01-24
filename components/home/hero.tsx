
"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { FaRobot, FaCode, FaChartLine } from 'react-icons/fa';


export function Hero() {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <HeroHighlight>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
        className="text-center"
      >
        <motion.h1
          variants={iconVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white max-w-4xl leading-tight lg:leading-snug mx-auto mb-6"
        >
          Automate, Analyze, Accelerate with{" "}
          <Highlight className="text-primary dark:text-primary-light">
            Playwright 
          </Highlight>
        </motion.h1>

        <motion.p
          variants={iconVariants}
          className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8"
        >
          Unleash the power of intelligent web automation for scraping, testing, and data analysis
        </motion.p>

        <motion.div
          variants={iconVariants}
          className="flex justify-center space-x-8 text-4xl md:text-5xl text-primary dark:text-primary-light mb-12"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <FaRobot />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <FaCode />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <FaChartLine />
          </motion.div>
        </motion.div>

        <motion.div
          variants={iconVariants}
          className="flex justify-center space-x-4"
        >
        </motion.div>
      </motion.div>
    </HeroHighlight>
  );
}
