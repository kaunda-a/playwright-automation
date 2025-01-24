
import React from "react";
import { motion } from "framer-motion";
import { useId } from "react";

const FeatureCard = ({ feature, index }: { feature: { title: string; description: string }; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-8 rounded-3xl overflow-hidden shadow-lg"
    >
      <div className="relative z-10">
        <Grid size={20} />
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="text-2xl font-bold text-neutral-800 dark:text-white mb-4"
        >
          {feature.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="text-neutral-600 dark:text-neutral-300 text-lg font-normal"
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
};


export function Feature() {
  return (
    <section className="py-24 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-md" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-filter backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/30 dark:border-black/30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-neutral-900 dark:text-white sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
           Web Scraping
          </h2>
          <p className="mt-4 text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto">
            Empower your data collection with cutting-edge automation technologies
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {grid.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}


const grid = [
  {
    title: "Intelligent Bot Management",
    description:
      "Deploy and manage multiple bots simultaneously, each with unique fingerprints and behaviors for undetectable scraping.",
  },
  {
    title: "Advanced Proxy Rotation",
    description:
      "Seamlessly rotate through a vast pool of proxies to ensure high availability and avoid IP blocks during scraping sessions.",
  },
  {
    title: "Dynamic Fingerprint Generation",
    description:
      "Create realistic browser fingerprints on-the-fly to mimic genuine user behavior and bypass anti-bot measures.",
  },
  {
    title: "Captcha Solving Integration",
    description:
      "Automatically solve CAPTCHAs and other challenge-response tests to maintain uninterrupted data collection.",
  },
  {
    title: "Scalable Data Extraction",
    description:
      "Extract data at scale with our high-performance scraping engine, capable of handling millions of data points efficiently.",
  },
  {
    title: "Real-time Monitoring",
    description:
      "Monitor your scraping tasks in real-time with detailed logs and performance metrics for optimal resource management.",
  },
  {
    title: "Customizable Scraping Workflows",
    description:
      "Design complex scraping workflows with our intuitive drag-and-drop interface, tailored to your specific data needs.",
  },
  {
    title: "Automated Data Processing",
    description:
      "Process and transform scraped data on-the-fly with our powerful data manipulation tools and export to various formats.",
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
