"use client";

import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";

export function Header() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <FaUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <FaEnvelope className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Company",
      link: "/company",
      icon: <FaEnvelope className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Product",
      link: "/product",
      icon: <FaEnvelope className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
