import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Palette,
  Code,
  Cpu,
  Zap,
  Cloud,
  Wrench
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Creative & Design",
    icon: Palette,
    items: ["Photoshop", "Illustrator", "Figma", "Canva"]
  },
  {
    title: "Frontend Development",
    icon: Code,
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vite"]
  },
  {
    title: "Programming",
    icon: Cpu,
    items: ["C", "C++", "Java", "SQL"]
  },
  {
    title: "Automation & Systems",
    icon: Zap,
    items: ["Business Automation", "Digital Workflows", "API Integrations"]
  },
  {
    title: "Platforms & Services",
    icon: Cloud,
    items: ["Firebase", "Google Maps API", "Cloudinary", "OpenRouter AI"]
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["VS Code", "Git", "GitHub", "Notion"]
  }
];

const floatingBadges = [
  "React",
  "TypeScript",
  "Firebase",
  "Automation",
  "Branding",
  "UI/UX",
  "API",
  "Design"
];

export function TechStack() {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".tech-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          }
        }
      );

      // Parallax mesh animation
      gsap.to(".mesh-bg", {
        y: 60,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Floating badges motion
      gsap.utils.toArray(".floating-badge").forEach((badge: any) => {
        gsap.to(badge, {
          y: "+=40",
          x: "+=30",
          duration: 6 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, containerRef);

    return () => ctx.revert();

  }, []);

  return (

    <section
      ref={containerRef}
      className="w-full bg-background py-24 px-6 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >

      {/* Floating Tech Badges */}

      {floatingBadges.map((badge, i) => (
        <span
          key={i}
          className="floating-badge absolute text-xs md:text-sm px-3 py-1 rounded-full
          bg-white/5 border border-white/10 backdrop-blur-sm
          text-gray-400 pointer-events-none"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 90}%`
          }}
        >
          {badge}
        </span>
      ))}


      {/* Mesh Background */}

      <div className="mesh-bg absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none" />


      {/* Section Header */}

      <div className="text-center mb-20 z-10">

        <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">
          My <span className="text-secondary">Digital Arsenal</span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          The tools and systems I use to design brands, build digital products,
          and create scalable business solutions.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-purple-400 mx-auto rounded-full" />

      </div>


      {/* Cards Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full z-10 relative">

        {categories.map((category, idx) => {

          const Icon = category.icon;

          return (

            <div
              key={idx}
              className="tech-card relative bg-text/5 dark:bg-black/20 border border-text/10 dark:border-white/10 rounded-2xl p-8 overflow-hidden group
              hover:bg-text/10 dark:hover:bg-black/40
              hover:border-secondary/30
              hover:-translate-y-2 hover:scale-[1.02]
              hover:shadow-xl
              transition-all duration-300"
            >

              {/* Glow overlay */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-secondary to-purple-400 blur-2xl transition-opacity duration-500" />


              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-6">

                  <div
                    className="p-3 rounded-xl bg-text/10 dark:bg-white/5 border border-text/10 dark:border-white/10
                    group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
                    transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>

                  <h3 className="text-2xl font-bold text-text dark:text-white group-hover:text-secondary transition-colors">
                    {category.title}
                  </h3>

                </div>


                {/* Tags */}

                <div className="flex flex-wrap gap-2">

                  {category.items.map((item) => (

                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm font-medium
                      text-gray-600 dark:text-gray-300
                      bg-text/5 border border-text/10
                      dark:bg-white/5 dark:border-white/5
                      rounded-full backdrop-blur-sm
                      group-hover:border-secondary/40
                      group-hover:scale-105
                      transition-all duration-300"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* Grid background */}

      <div className="absolute inset-0 z-0
      bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
      linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
      bg-[size:80px_80px]
      pointer-events-none" />

    </section>

  );

}