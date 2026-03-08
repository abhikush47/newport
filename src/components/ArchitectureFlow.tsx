import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Target, Palette, Zap, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { id: 'idea', label: 'Idea', icon: Lightbulb, desc: 'Business Vision' },
  { id: 'strategy', label: 'Strategy', icon: Target, desc: 'Market Positioning' },
  { id: 'design', label: 'Design', icon: Palette, desc: 'Brand Identity' },
  { id: 'automation', label: 'Automation', icon: Zap, desc: 'Digital Workflows' },
  { id: 'growth', label: 'Growth', icon: TrendingUp, desc: 'Scale & Marketing' },
];

export function ArchitectureFlow() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1,
                }
            });

            gsap.utils.toArray('.arch-node').forEach((node, i) => {
                tl.fromTo(node as HTMLElement,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
                    i * 2
                );
            });

            gsap.utils.toArray('.arch-line').forEach((line, i) => {
                tl.fromTo(line as HTMLElement,
                    { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
                    { scaleX: 1, opacity: 1, duration: 1.5 },
                    (i * 2) + 1
                );
            });

            gsap.utils.toArray('.arch-line-mobile').forEach((line, i) => {
                tl.fromTo(line as HTMLElement,
                    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
                    { scaleY: 1, opacity: 1, duration: 1.5 },
                    (i * 2) + 1
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col relative overflow-hidden">
            <div className="text-center mb-24 z-10 transition-colors duration-300">
                <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">
                    I Think in <span className="text-primary">Systems.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono mb-4 text-primary/80">
                    Idea → Strategy → Design → Automation → Growth
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Brand Systems. Business Automation. Scalable Digital Presence<br />
                    <span className="text-text dark:text-white font-medium">Creative. Strategic. Impactful.</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 flex-1 max-w-[1400px] mx-auto w-full z-10">
                {nodes.map((node, i) => (
                    <div key={node.id} className="flex flex-col md:flex-row items-center group">
                        <div className={`arch-node glass p-6 rounded-2xl border ${i === 0 ? 'border-primary shadow-[0_0_30px_rgba(248,112,96,0.1)]' : 'border-text/10 dark:border-white/10'} flex flex-col items-center w-48 md:w-56 relative transition-all duration-300 hover:-translate-y-2 hover:border-primary/50`}>
                            <node.icon size={44} className={`${i === 0 ? 'text-primary' : 'text-gray-600 dark:text-gray-400 group-hover:text-primary'} mb-4 transition-colors`} />
                            <h3 className="text-xl font-bold text-text dark:text-white mb-1 transition-colors">{node.label}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-500 font-mono text-center transition-colors">{node.desc}</p>
                        </div>

                        {i !== nodes.length - 1 && (
                            <>
                                <div className="arch-line hidden md:block w-8 lg:w-16 h-[2px] bg-gradient-to-r from-primary to-zinc-700 mx-2 self-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-white/50 blur-[2px] animate-[pulse_2s_ease-in-out_infinite]" />
                                </div>
                                <div className="arch-line-mobile md:hidden h-12 w-[2px] bg-gradient-to-b from-primary to-zinc-700 my-2 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-white/50 blur-[2px] animate-[pulse_2s_ease-in-out_infinite]" />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
        </section>
    );
}
