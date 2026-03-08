import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

export function ComposeSection() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Loop through 3 animation steps every 3 seconds
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col items-center justify-center relative overflow-hidden">

            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center mb-12 z-10 transition-colors duration-300">
                <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-secondary">
                        Jetpack Compose
                    </span> Magic
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Declarative UIs built with precision. Code updates sync with UI state in real-time.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 lg:gap-16 z-10">

                {/* Left: Live UI Preview */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                    {/* Phone Frame Mock */}
                    <div className="w-[300px] h-[600px] rounded-[3rem] border-[8px] border-text/10 dark:border-white/10 bg-text/5 dark:bg-black/20 p-6 flex flex-col shadow-2xl relative overflow-hidden transition-colors">
                        <div className="absolute top-0 inset-x-0 h-6 bg-text/10 dark:bg-white/10 rounded-b-xl w-32 mx-auto transition-colors" />

                        <div className="flex-1 mt-12 flex flex-col gap-4">
                            <h4 className="text-text dark:text-white font-bold ml-1 mb-2 transition-colors">Social Feed</h4>

                            {/* Profile Card UI */}
                            <motion.div
                                layout
                                animate={{
                                    boxShadow: step === 0 ? "0 0 20px rgba(139,92,246,0.3)" : step === 1 ? "0 0 0px rgba(139,92,246,0)" : "0 0 20px rgba(61,220,132,0.3)",
                                    scale: step === 2 ? 1.02 : 1,
                                    borderColor: step === 2 ? "#f87060" : "rgba(255,255,255,0.1)"
                                }}
                                transition={{ duration: 0.5 }}
                                className="w-full bg-text/5 dark:bg-black/40 rounded-2xl p-4 border border-text/10 dark:border-white/10 flex items-center gap-4 transition-colors"
                            >
                                <motion.div
                                    layout
                                    className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 transition-colors duration-500 ${step === 2 ? 'bg-primary' : 'bg-secondary'}`}
                                >
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=akhilesh" alt="avatar" className="w-full h-full object-cover" />
                                </motion.div>

                                <div className="flex-1">
                                    <motion.div
                                        layout
                                        className="h-4 bg-zinc-600 rounded w-24 mb-2"
                                        animate={{ width: step === 2 ? "120px" : "96px", backgroundColor: step === 2 ? "#ffffff" : "#52525b" }}
                                    />
                                    <motion.div
                                        layout
                                        className="h-3 bg-zinc-700 rounded w-full"
                                    />
                                </div>
                            </motion.div>

                            {/* Dummy Card */}
                            <div className="w-full bg-text/5 dark:bg-black/20 rounded-2xl p-4 border border-text/10 dark:border-white/10 flex items-center gap-4 opacity-50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-text/10 dark:bg-white/10 flex-shrink-0 transition-colors" />
                                <div className="flex-1">
                                    <div className="h-4 bg-zinc-400 dark:bg-zinc-700 rounded w-20 mb-2 transition-colors" />
                                    <div className="h-3 bg-zinc-300 dark:bg-zinc-800 rounded w-32 transition-colors" />
                                </div>
                            </div>

                        </div>

                        {/* Recomposition Indicator */}
                        <AnimatePresence>
                            {step !== 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-800/90 text-xs px-3 py-1.5 rounded-full border border-text/20 dark:border-zinc-700 text-primary flex items-center gap-2"
                                >
                                    <Layers size={14} />
                                    Recomposition...
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Code editor */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <div className="w-full h-[500px] glass rounded-2xl overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-shadow">
                        <div className="h-10 bg-text/10 dark:bg-black/40 border-b border-text/10 dark:border-white/5 flex items-center px-4 gap-2 transition-colors">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 text-xs font-mono text-gray-600 dark:text-gray-500 transition-colors">ProfileCard.kt</span>
                        </div>

                        <div className="flex-1 p-6 font-mono text-sm overflow-x-auto">
                            <pre className="text-gray-700 dark:text-gray-300 transition-colors">
                                <span className="text-blue-400">@Composable</span><br />
                                <span className="text-[#b3a394]">fun</span> <span className="text-yellow-200">ProfileCard</span>() {'{\n'}
                                {'  '}
                                <motion.span
                                    animate={{
                                        color: step === 0 ? "#A9A9A9" : "#D1D5DB",
                                        backgroundColor: step === 0 ? "rgba(169,169,169,0.15)" : "transparent"
                                    }}
                                    className="px-1 rounded block"
                                >
                                    <span className="text-blue-400">Card</span>(
                                </motion.span>
                                {'      '}elevation = <span className="text-[#f87060]">8.dp</span>,<br />
                                {'      '}shape = <span className="text-blue-400">RoundedCornerShape</span>(<span className="text-[#f87060]">16.dp</span>),<br />
                                {'      '}backgroundColor = <span className="text-blue-400">MaterialTheme</span>.colors.surface<br />
                                {'   '}
                                <motion.span
                                    animate={{
                                        color: step === 0 ? "#A9A9A9" : "#D1D5DB",
                                        backgroundColor: step === 0 ? "rgba(169,169,169,0.15)" : "transparent"
                                    }}
                                    className="px-1 rounded block"
                                >
                                    ) {'{\n'}
                                </motion.span>
                                {'       '}<span className="text-blue-400">Row</span>(<span className="text-blue-400">Modifier</span>.padding(<span className="text-[#f87060]">16.dp</span>)) {'{\n'}
                                {'           '}
                                <motion.span
                                    animate={{
                                        backgroundColor: step === 2 ? "rgba(248,112,96,0.15)" : "transparent"
                                    }}
                                    className="px-1 rounded block text-yellow-200"
                                >
                                    <span className="text-yellow-200">ProfileImage</span>()
                                </motion.span>
                                {'           '}<span className="text-blue-400">Spacer</span>(<span className="text-blue-400">Modifier</span>.width(<span className="text-[#f87060]">16.dp</span>))<br />
                                {'           '}
                                <motion.span
                                    animate={{
                                        backgroundColor: step === 2 ? "rgba(248,112,96,0.15)" : "transparent"
                                    }}
                                    className="px-1 rounded block text-yellow-200"
                                >
                                    <span className="text-yellow-200">ProfileInfo</span>()
                                </motion.span>
                                {'       '}{'}\n'}
                                {'   '}{'}\n'}
                                {'}'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
