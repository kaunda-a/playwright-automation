"use client";

import { motion, useAnimation } from "framer-motion";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Error = () => {
  const router = useRouter();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      } 
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 8px rgb(59, 130, 246)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center justify-center bg-gradient-to-br w-full h-full"
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={iconVariants}>
        <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
      </motion.div>
      <motion.h1 variants={childVariants} className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        Oops!.
      </motion.h1>
      <motion.p variants={childVariants} className="text-xl mb-6 text-gray-600 dark:text-gray-400">
        Our automation system encountered an unexpected error.
      </motion.p>
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          onClick={() => router.refresh()}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out"
        >
          <FaRedo className="mr-2" />
          <span>Try Again</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Error;
