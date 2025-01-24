import React from "react";
import { Meteors } from "../ui/meteors";
import { motion } from "framer-motion";

export function Banner() {
  return (
    <div className="w-full py-20 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl relative"
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-[0.85] rounded-3xl blur-3xl opacity-50" />
        <div className="relative shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 px-8 py-12 overflow-hidden rounded-3xl flex flex-col justify-end items-start">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            className="h-16 w-16 rounded-full border-2 flex items-center justify-center mb-8 border-blue-500 bg-blue-50 dark:bg-blue-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-bold text-5xl text-gray-900 dark:text-white mb-6 relative z-50"
          >
            Revolutionize Your Workflow with AI-Powered Automation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="font-normal text-xl text-gray-700 dark:text-blue-200 mb-10 relative z-50 max-w-3xl"
          >
            Harness the power of cutting-edge AI to automate complex tasks, streamline your processes, and unlock unprecedented efficiency. Our intelligent system adapts to your unique needs, learning and evolving to deliver optimal results.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative z-50 shadow-lg"
          >
           Automation
          </motion.button>

          <Meteors number={20} />
        </div>
      </motion.div>
    </div>
  );
}
