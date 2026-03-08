import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Github, Linkedin, Mail, Cpu, Command } from 'lucide-react';

interface CommandRecord {
    command: string;
    output: React.ReactNode;
}

export function ContactSection() {
    const [history, setHistory] = useState<CommandRecord[]>([
        {
            command: 'welcome',
            output: (
                <div className="text-gray-300 mb-2">
                    <span className="text-primary font-bold">Welcome to Abhishek's Terminal OS.</span><br />
                    Type <span className="text-secondary">'help'</span> to see available commands.
                </div>
            )
        }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Keep input focused when clicking on the terminal body
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const processCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = null;

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="text-gray-300 flex flex-col gap-1">
                        <div><span className="text-primary w-20 inline-block font-bold">whoami</span> - Details about my background</div>
                        <div><span className="text-primary w-20 inline-block font-bold">skills</span> - List of technical skills</div>
                        <div><span className="text-primary w-20 inline-block font-bold">contact</span> - Links to get in touch</div>
                        <div><span className="text-primary w-20 inline-block font-bold">hire</span> - Initializing connection parameters</div>
                        <div><span className="text-primary w-20 inline-block font-bold">clear</span> - Clears the terminal</div>
                    </div>
                );
                break;
            case 'whoami':
                output = (
                    <div className="text-gray-300 leading-relaxed">
                        Abhishek Kushwaha<br />
                        <span className="text-secondary mb-2 inline-block">A Dedicated Engineer | Founder</span><br />
                        I specialize in building powerful digital brands, high-converting
design systems, and automation solutions for modern businesses.
From restaurant scan menus and branding kits to social media
growth systems and business automation, I create solutions
that help businesses scale faster.
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="text-gray-300">
                        <span className="text-primary font-bold">Languages:</span> C, Java, JavaScript, SQL
<br />
                        <span className="text-primary font-bold">Design & Creative Tools:</span> Photoshop, Illustrator, Canva, Figma<br />
                        <span className="text-primary font-bold">Web & Development:</span> HTML, CSS, React (Basics), Vite, Git, GitHub<br />
                        <span className="text-primary font-bold">Automation & Systems:</span> Business Automation, Scan Menu Systems, Digital Workflows
<br />
                        <span className="text-primary font-bold">Databases:</span> Room Database, Firebase
                        <span className="text-primary font-bold">Marketing & Growth:</span> ocial Media Strategy, Content Planning, Brand Positioning
                        <span className="text-primary font-bold">Tools & Platforms:</span> VS Code, Cursor, Firebase, Shopify, Notion

                    </div>
                );
                break;
            case 'contact':
            case 'hire':
                output = (
                    <div className="flex flex-col text-gray-300 animate-in fade-in duration-500">
                        <div className="mb-2 text-[#b3a394]">Executing profile initialization... [OK]</div>
                        <div className="mb-4">Contact parameters loaded successfully:</div>

                        <div className="flex flex-col gap-3 mb-6">
                            <a href="mailto:akhileshbltr2002@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer w-fit">
                                <Mail size={16} className="text-secondary group-hover:text-primary transition-colors" />
                                <span>abhi.kush047@gmail.com</span>
                            </a>
                            <a href="https://www.linkedin.com/in/abhishek-kushwaha-846321289/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer w-fit">
                                <Linkedin size={16} className="text-secondary group-hover:text-primary transition-colors" />
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://github.com/abhikush47" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer w-fit">
                                <Github size={16} className="text-secondary group-hover:text-primary transition-colors" />
                                <span>GitHub</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400 mt-1">
                                <span className="text-primary font-bold">Location:</span> Bhubaneswar,India
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <a href="mailto:abhi.kush047@gmail.com" className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-zinc-950 font-bold rounded-lg hover:bg-primary/90 transition-all glow-green">
                                <Send size={16} /> Send Message
                            </a>
                            <span className="text-gray-500 text-xs flex items-center gap-2">
                                <Cpu size={14} /> System ready for new connections.
                            </span>
                        </div>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'sudo':
                output = <div className="text-red-400">Nice try! You do not have root privileges.</div>;
                break;
            case '':
                output = null;
                break;
            default:
                output = <div className="text-red-400">Command not found: '{trimmedCmd}'. Type 'help' to see available commands.</div>;
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (input.trim()) {
                setCommandHistory(prev => [...prev, input]);
                setHistoryIndex(-1);
            }
            processCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const prevIndex = historyIndex - 1;
                setHistoryIndex(prevIndex);
                setInput(commandHistory[commandHistory.length - 1 - prevIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <section className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col items-center justify-center relative transition-colors duration-300">
            <div className="text-center mb-12 z-10 transition-colors duration-300">
                <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">
                    Let's Build <span className="text-primary">Something That Shapes.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Open to Build and Changes rules.
                </p>
            </div>

            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 z-10 perspective-[1000px]">
                {/* Left Side: Terminal */}
                <div className="w-full lg:w-2/3 max-w-4xl glass rounded-2xl overflow-hidden shadow-2xl border border-text/10 dark:border-white/10 flex flex-col h-[500px] transition-colors">
                    {/* Terminal Header */}
                    <div className="h-12 bg-text/10 dark:bg-black/40 border-b border-text/10 dark:border-white/10 flex items-center px-4 justify-between shrink-0 transition-colors">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm transition-colors">
                            <Terminal size={14} /> abhi@portfolio ~ zsh
                        </div>
                        <div className="w-16" /> {/* Spacer */}
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={scrollRef}
                        className="p-4 sm:p-6 font-mono text-sm sm:text-base flex-1 overflow-y-auto cursor-text bg-[#0A0F1A] overscroll-contain"
                        onClick={handleTerminalClick}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        {/* Command History */}
                        <div className="flex flex-col gap-4">
                            {history.map((record, i) => (
                                <div key={i} className="flex flex-col">
                                    {record.command !== 'welcome' && (
                                        <div className="flex items-center mb-1">
                                            <span className="text-blue-400 font-bold mr-2 shrink-0">abhi@macbook</span>
                                            <span className="text-[#3DDC84] mr-2 shrink-0">➜</span>
                                            <span className="text-gray-400 mr-2 shrink-0">~/portfolio</span>
                                            <span className="text-white break-all">{record.command}</span>
                                        </div>
                                    )}
                                    {record.output && (
                                        <div className="ml-0 sm:ml-[2px]">{record.output}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Active Input Line */}
                        <div className="flex items-start mt-4">
                            <div className="flex items-center shrink-0 pt-[2px] sm:pt-0">
                                <span className="text-blue-400 font-bold mr-2 hidden sm:inline">abhi@macbook</span>
                                <span className="text-[#3DDC84] mr-2">➜</span>
                                <span className="text-gray-400 mr-2">~/portfolio</span>
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-white w-full flex-1 caret-white break-all"
                                spellCheck={false}
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Commands Sidebar */}
                <div className="w-full lg:w-1/3 glass rounded-2xl overflow-hidden shadow-2xl border border-text/10 dark:border-white/10 flex flex-col h-[500px] bg-background/40 dark:bg-black/40 backdrop-blur-md transition-colors">
                    <div className="h-12 border-b border-text/10 dark:border-white/10 flex items-center px-6 gap-3 transition-colors">
                        <Command size={16} className="text-secondary" />
                        <span className="text-text dark:text-white font-medium text-sm tracking-wide transition-colors">Available Commands</span>
                    </div>

                    <div className="flex-1 p-6 flex flex-col gap-3 font-mono text-sm overflow-y-auto" data-lenis-prevent>
                        {[
                            { cmd: 'whoami', desc: 'Background info' },
                            { cmd: 'skills', desc: 'Technical profile' },
                            { cmd: 'contact', desc: 'Get in touch' },
                            { cmd: 'hire', desc: 'Init parameters' },
                            { cmd: 'help', desc: 'Show all commands' },
                            { cmd: 'clear', desc: 'Clear terminal' }
                        ].map((item, idx) => {
                            const isTyping = input.trim().toLowerCase() === item.cmd ||
                                (input.trim().length > 0 && item.cmd.startsWith(input.trim().toLowerCase()));

                            return (
                                <motion.div
                                    key={item.cmd}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    className={`relative p-3 rounded-lg border transition-all duration-300 flex flex-col gap-1 overflow-hidden ${isTyping
                                        ? 'border-primary/50 bg-primary/10 pl-6 shadow-[0_0_15px_rgba(61,220,132,0.15)] glow-green'
                                        : 'border-text/5 bg-text/5 hover:border-text/20 hover:bg-text/10 dark:border-white/5 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {isTyping && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className={`font-bold transition-colors duration-300 ${isTyping ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                                            {item.cmd}
                                        </span>
                                        {isTyping && input.trim().toLowerCase() === item.cmd && (
                                            <span className="text-xs text-primary font-sans animate-pulse">Press Enter ↵</span>
                                        )}
                                    </div>
                                    <span className="text-gray-500 text-xs font-sans">{item.desc}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Static Contact Links */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-4xl mx-auto mt-20 flex flex-col items-center z-10"
            >
                <h3 className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-8 transition-colors">Prefer the classic way?</h3>
                <div className="flex flex-wrap justify-center gap-6">
                    <a
                        href="mailto:abhi.kush047@gmail.com"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-text/5 border border-text/10 hover:bg-text/10 hover:border-primary/50 hover:text-primary dark:text-gray-300 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition-all duration-300 group"
                    >
                        <Mail size={20} className="text-secondary group-hover:text-primary transition-colors" />
                        <span className="font-medium">Email Me</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abhishek-kushwaha-846321289/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-text/5 border border-text/10 hover:bg-text/10 hover:border-primary/50 hover:text-primary dark:text-gray-300 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition-all duration-300 group"
                    >
                        <Linkedin size={20} className="text-secondary group-hover:text-primary transition-colors" />
                        <span className="font-medium">LinkedIn</span>
                    </a>
                    <a
                        href="https://github.com/abhikush47"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-text/5 border border-text/10 hover:bg-text/10 hover:border-primary/50 hover:text-primary dark:text-gray-300 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition-all duration-300 group"
                    >
                        <Github size={20} className="text-secondary group-hover:text-primary transition-colors" />
                        <span className="font-medium">GitHub</span>
                    </a>
                </div>
            </motion.div>

            <footer className="w-full mt-32 border-t border-text/10 dark:border-zinc-800 pt-8 pb-4 text-center text-gray-500 text-sm z-10 transition-colors duration-300">
                <p>© {new Date().getFullYear()} Abhishek Kushwaha. Built with React, Tailwind & Framer Motion.</p>
            </footer>
        </section>
    );
}
