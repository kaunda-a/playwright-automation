"use client";

import React from "react";
import Link from "next/link";
import { Theme } from "@/components/ui/theme";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-black/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-neutral-200 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-400 hover:text-teal-500 transition">About Us</Link></li>
              <li><Link href="/careers" className="text-neutral-400 hover:text-teal-500 transition">Careers</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-teal-500 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-neutral-200 font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-neutral-400 hover:text-teal-500 transition">Scraping Tools</Link></li>
              <li><Link href="/pricing" className="text-neutral-400 hover:text-teal-500 transition">Pricing</Link></li>
              <li><Link href="/integrations" className="text-neutral-400 hover:text-teal-500 transition">API Integration</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-neutral-200 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-neutral-400 hover:text-teal-500 transition">Blog</Link></li>
              <li><Link href="/docs" className="text-neutral-400 hover:text-teal-500 transition">Documentation</Link></li>
              <li><Link href="/support" className="text-neutral-400 hover:text-teal-500 transition">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-neutral-200 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral-400 hover:text-teal-500 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-400 hover:text-teal-500 transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-neutral-400 hover:text-teal-500 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <div className="flex justify-center mb-4">
            <Theme />
          </div>
          <p>&copy; {currentYear} ScraperBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
