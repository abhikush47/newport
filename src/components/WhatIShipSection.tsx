import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Palette, Zap, Settings, TrendingUp } from "lucide-react";

const items = [
  {
    title: "Business Branding Systems",
    description:
      "Complete brand identities, design systems, and visual assets that help businesses look premium and consistent across all platforms.",
    icon: Palette,
    color: "from-orange-500 to-amber-400",
  },
  {
    title: "Business Automation",
    description:
      "Automation workflows that reduce manual work, streamline operations, and help businesses run faster and smarter.",
    icon: Zap,
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Restaurant & Local Business Tools",
    description:
      "Digital tools like scan menus, ordering systems, and custom solutions designed for restaurants and local brands.",
    icon: Settings,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Social Media Growth Systems",
    description:
      "Content strategies, branding systems, and design frameworks that help brands grow and reach more customers.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-400",
  },
];

export function WhatIShipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-background py-24 px-6 lg:px-24 flex flex-col relative overflow-hidden"
    >
      {/* Title */}

      <div className="text-center mb-20 z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-white mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">
            What
          </span>{" "}
          I Build
        </motion.h2>

        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-300 mx-auto rounded-full" />
      </div>

      {/* Cards */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto z-10"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="relative p-8 rounded-3xl bg-text/5 dark:bg-zinc-900/50 border border-text/10 dark:border-white/5 backdrop-blur-sm overflow-hidden group
            transition-all duration-500
            hover:-translate-y-3 hover:scale-[1.03]
            hover:border-primary/30
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            {/* Hover gradient overlay */}

            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} transition-opacity duration-500`}
            />

            <div className="relative z-10 flex flex-col h-full">

              {/* Icon */}

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center
                bg-text/10 dark:bg-zinc-800/80 mb-6 border border-text/5 dark:border-white/5
                transition-all duration-500
                group-hover:scale-110
                group-hover:shadow-[0_0_30px_rgba(255,120,50,0.5)]"
              >
                <item.icon className="w-7 h-7 text-text dark:text-white" />
              </div>

              {/* Title */}

              <h3
                className="text-2xl font-bold text-text dark:text-white mb-4
                transition-all duration-500
                group-hover:text-transparent
                group-hover:bg-clip-text
                group-hover:bg-gradient-to-r
                group-hover:from-primary
                group-hover:to-orange-400"
              >
                {item.title}
              </h3>

              {/* Description */}

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-300">
                {item.description}
              </p>
            </div>

            {/* Background glow */}

            <div
              className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${item.color}
              rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}