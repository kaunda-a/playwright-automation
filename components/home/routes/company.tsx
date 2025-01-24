"use client";

import React from "react";
import { motion } from "framer-motion";
import { Meteors } from "../../ui/meteors";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Switch } from "../../ui/switch";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/hover-card";
import { GlareCard } from "../../ui/glare-card";
import { AnimatedTooltip } from "../../ui/animated-tooltip";
import { IconBuildingSkyscraper, IconUsers, IconRocket, IconBulb } from "@tabler/icons-react";

const Company: React.FC = () => {
  const companyInfo = [
    {
      title: "Our Mission",
      description: "To revolutionize web automation and data extraction, empowering businesses with cutting-edge AI solutions.",
      icon: <IconRocket className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Our Team",
      description: "A diverse group of experts in AI, web technologies, and data science, committed to pushing the boundaries of innovation.",
      icon: <IconUsers className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Our Values",
      description: "Integrity, innovation, and customer-centricity are at the core of everything we do.",
      icon: <IconBulb className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Our Impact",
      description: "Transforming industries through intelligent automation, one client at a time.",
      icon: <IconBuildingSkyscraper className="h-6 w-6 text-green-500" />,
    },
  ];

  const companyHighlights = companyInfo.map((info, index) => ({
    quote: info.description,
    name: info.title,
    title: "Company Highlight",
  }));

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO & Founder",
      image: "https://source.unsplash.com/random/200x200?portrait,man",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "CTO",
      image: "https://source.unsplash.com/random/200x200?portrait,woman",
    },
    {
      id: 3,
      name: "Alex Johnson",
      designation: "Lead Developer",
      image: "https://source.unsplash.com/random/200x200?portrait",
    },
    {
      id: 4,
      name: "Emily Brown",
      designation: "UX Designer",
      image: "https://source.unsplash.com/random/200x200?portrait,designer",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-white pt-24">
      <Meteors number={20} />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Company
        </motion.h1>

        <motion.p 
          className="text-xl text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Leading the future of web automation and AI-driven data solutions
        </motion.p>

        <ToggleGroup type="single" defaultValue="mission" className="mb-8">
          {companyInfo.map((info, index) => (
            <ToggleGroupItem key={index} value={info.title.toLowerCase().replace(/\s+/g, '-')}>
              <HoverCard>
                <HoverCardTrigger>
                  {info.icon}
                </HoverCardTrigger>
                <HoverCardContent>
                  <h3 className="text-lg font-semibold">{info.title}</h3>
                  <p>{info.description}</p>
                </HoverCardContent>
              </HoverCard>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <GlareCard className="mb-12 p-6">
          <h2 className="text-2xl font-semibold mb-4">Company Highlights</h2>
          <InfiniteMovingCards
            items={companyHighlights}
            direction="right"
            speed="slow"
          />
        </GlareCard>

        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Team</h2>
          <div className="flex justify-center">
            <AnimatedTooltip items={teamMembers} />
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Switch id="dark-mode" />
          <label htmlFor="dark-mode" className="ml-2">Dark Mode</label>
        </div>
      </div>
    </div>
  );
};

export default Company;
