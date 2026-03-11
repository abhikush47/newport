import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import resumePdf from '../assets/Abhishek Resume.pdf';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Initial Load Animation (Cinematic reveal)
            const initTl = gsap.timeline();

            initTl.fromTo(badgeRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            )
                .fromTo(text1Ref.current,
                    { y: 50, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
                    "-=0.6"
                )
                .fromTo(text2Ref.current,
                    { y: 50, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
                    "-=1.0"
                )
                .fromTo([descRef.current, buttonsRef.current],
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 },
                    "-=0.8"
                );

            // Dramatic Text Scroll Animation
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top", // Triggers dynamically as the 150vh section leaves the viewport
                    scrub: 1, // Smooth, slightly lagging scrub
                }
            });

            scrollTl
                // 1. Elements fade out and move up elegantly
                .fromTo([badgeRef.current, descRef.current, buttonsRef.current],
                    { y: 0, opacity: 1 },
                    { y: -100, opacity: 0, duration: 1, stagger: 0.05, ease: "power1.inOut" }, 0)
                // 2. The main text dramatically splits horizontally, shrinks!
                .fromTo(text1Ref.current,
                    { x: "0vw", y: "0vh", scale: 1, opacity: 1 },
                    { x: "-15vw", y: "-10vh", scale: 0.8, opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0)
                .fromTo(text2Ref.current,
                    { x: "0vw", y: "0vh", scale: 1, opacity: 1 },
                    { x: "15vw", y: "0vh", scale: 0.8, opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0)
                // 3. Background orbs expand dramatically
                .fromTo('.bg-orb-1', { scale: 1, opacity: 0.3 }, { scale: 3, opacity: 0.8, duration: 2 }, 0)
                .fromTo('.bg-orb-2', { scale: 1, opacity: 0.2 }, { scale: 3.5, opacity: 0.6, duration: 2 }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-[150vh] bg-background">

            {/* Background glowing orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="bg-orb-1 absolute top-[25vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none origin-center z-0"
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="bg-orb-2 absolute top-[20vh] right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none origin-center z-0"
            />

            {/* Sticky Wrapper to keep text perfectly visible while scrolling the 150vh before the next section arrives */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 lg:px-24">

                {/* Text Content Container */}
                <div className="z-10 flex flex-col items-center text-center w-full max-w-4xl relative mt-[-5vh]">

                    <a
                        ref={badgeRef}
                        href={resumePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="will-change-transform inline-block px-4 py-1.5 mb-8 border border-text/10 dark:border-white/10 bg-text/5 dark:bg-white/5 rounded-full backdrop-blur-md hover:bg-text/10 dark:hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                        <span className="text-sm font-semibold tracking-widest text-primary uppercase flex items-center gap-3 group-hover:text-text dark:group-hover:text-white transition-colors">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary group-hover:bg-text dark:group-hover:bg-white transition-colors"></span>
                            </span>
                            Resume
                        </span>
                    </a>

                    {/* Cool, Dramatic Splitting Header */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-text dark:text-white mb-6 leading-[1.1] pb-2 overflow-visible relative flex flex-col items-center uppercase transition-colors">
                        <div ref={text1Ref} className="will-change-transform inline-block origin-center relative z-20 bg-background/40 rounded-2xl backdrop-blur-sm px-4">Abhishek Kush</div>
                        <span ref={text2Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent dark:via-white to-secondary drop-shadow-[0_0_40px_rgba(248,112,96,0.3)] will-change-transform pb-4 pr-6 pl-6 mt-[-10px] origin-center relative bg-background/40 rounded-2xl backdrop-blur-sm transition-colors">
                            WAHA
                        </span>
                    </h1>

                    <h2 ref={descRef} className="will-change-transform text-2xl md:text-3xl text-text dark:text-white font-bold mb-4 tracking-wide transition-colors">
                        A Dedicated Engineer
                    </h2>

                    <p className="text-primary font-mono text-sm md:text-base mb-6 tracking-tight">
                        Founder · Strategies · Automations · Real-Time Systems
                    </p>

                    <p className="will-change-transform text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed font-light transition-colors">
                        From AI to scalable social platforms — <span className="text-text dark:text-white font-medium">built for Change.</span>
                    </p>

                    <div ref={buttonsRef} className="will-change-transform flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative px-8 py-5 bg-primary text-background text-lg font-bold rounded-full overflow-hidden group shadow-[0_0_30px_rgba(248,112,96,0.2)] hover:shadow-[0_0_50px_rgba(248,112,96,0.5)] transition-all flex-1 text-center font-bold"
                        >
                            <span className="relative z-10">View Work</span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </a>
                        <a
                            href="https://linktr.ee/abhi__kush47"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-5 bg-text/5 dark:bg-white/5 text-text dark:text-white text-lg font-medium rounded-full border border-text/10 dark:border-white/10 hover:bg-text/10 dark:hover:bg-white/15 backdrop-blur-md transition-all flex-1 text-center hover:border-text/30 dark:hover:border-white/30 flex items-center justify-center"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-10"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-semibold">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={20} className="text-primary/70" />
                    </motion.div>
                </motion.div>

                {/* Subdued Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_20%,transparent_100%)] pointer-events-none z-0 transition-colors" />
            </div>
        </section>
    );
}
