"use client";

import React from "react";
import { ClientCard } from "@/components/ui/client-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Client() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Our Client 
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ClientCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Client Statistics</CardTitle>
                <CardDescription>Overview of your account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Total Projects: 15</li>
                  <li>Active Tasks: 7</li>
                  <li>Completed Tasks: 23</li>
                  <li>Team Members: 5</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>View Detailed Report</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Need assistance? Our support team is here to help!
          </p>
          <Button variant="outline">Contact Support</Button>
        </motion.div>
      </div>
    </div>
  );
}
