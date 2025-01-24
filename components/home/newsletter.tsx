"use client";

import React from "react";

export function Newsletter() {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white/10 dark:bg-black/10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-black/20">
      <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Automate Your Web Scraping
      </h1>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Welcome to ScraperBot, the ultimate web scraping and automation tool.
        We provide powerful, scalable, and customizable scraping solutions for
        your data collection needs. Whether you're gathering market intelligence,
        monitoring competitors, or automating web interactions, ScraperBot has
        got you covered.
      </p>
      <input
        type="text"
        placeholder="your@email.com"
        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 placeholder:text-neutral-700 bg-white/20 dark:bg-black/20"
      />
    </div>
  );
}
