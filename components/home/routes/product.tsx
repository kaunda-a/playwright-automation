"use client";

import React from "react";
import { motion } from "framer-motion";
import { Meteors } from "../../ui/meteors";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";


const Product: React.FC = () => {

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
          className="text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Innovative Products
        </motion.h1>

        <motion.p 
          className="text-2xl text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Leading the future of web automation and AI-driven data solutions with cutting-edge technology.
        </motion.p>
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-gray-700 rounded-lg p-4 shadow-lg border-2 border-gradient-to-r from-purple-500 to-pink-500 text-center">
              <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-300">{member.designation}</p>
            </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-3 px-6 font-medium shadow-lg transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More Solutions
          </motion.button>
        </div>

        <div className="mt-16 border-t border-gray-600 pt-8">
          <h2 className="text-4xl font-bold text-center mb-6">Why Choose Us?</h2>
          <p className="text-lg text-center mb-4 max-w-2xl mx-auto">
            Our commitment to excellence and innovation sets us apart. We provide tailored solutions that meet the unique needs of our clients, ensuring maximum efficiency and effectiveness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg border-2 border-green-500">
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-300">Our team consists of industry experts dedicated to delivering the best solutions.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg border-2 border-yellow-500">
              <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
              <p className="text-gray-300">We leverage the latest technologies to provide cutting-edge solutions.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg border-2 border-blue-500">
              <h3 className="text-xl font-semibold mb-2">Customer-Centric Approach</h3>
              <p className="text-gray-300">We prioritize our clients' needs and tailor our services accordingly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;