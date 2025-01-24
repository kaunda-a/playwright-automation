
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { IconMail, IconPhone, IconMessage, IconSend, IconRobot } from "@tabler/icons-react";
import { BackgroundBeams } from "../../ui/background-beams";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact form submitted");
  };

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden text-white">
      <BackgroundBeams />
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 mb-8 lg:mb-0"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Revolutionize Your Workflow with AI-Powered Automation
          </h2>
          <p className="text-gray-300 mb-6">
            Our cutting-edge automation solutions harness the power of artificial intelligence to streamline your processes and boost productivity.
          </p>
          <ul className="space-y-4">
            {["Intelligent Task Management", "Predictive Analytics", "Seamless Integration", "24/7 Automated Support"].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <IconRobot className="text-purple-400" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 max-w-md w-full rounded-2xl p-8 shadow-lg backdrop-blur-md relative z-10"
        >
          <h2 className="font-bold text-3xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Contact Us
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Ready to transform your business? Let's discuss how our automation solutions can work for you.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" type="text" className="bg-white/5" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="john@example.com" type="email" className="bg-white/5" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                placeholder="Your message here..."
                className="flex h-32 w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </LabelInputContainer>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 w-full text-white rounded-md py-3 font-medium shadow-lg flex items-center justify-center space-x-2"
              type="submit"
            >
              <IconSend size={18} />
              <span>Send Message</span>
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4">
              <ContactMethod icon={<IconMail />} text="info@example.com" />
              <ContactMethod icon={<IconPhone />} text="+1 (555) 123-4567" />
              <ContactMethod icon={<IconMessage />} text="Live Chat" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const ContactMethod = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 transition-colors hover:bg-white/10"
    >
      {React.cloneElement(icon as React.ReactElement, { className: "text-purple-400" })}
      <span className="text-gray-300">{text}</span>
    </motion.div>
  );
};

export default Contact;
