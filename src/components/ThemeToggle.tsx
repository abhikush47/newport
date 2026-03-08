import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full glass flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 90 : 0,
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute"
                >
                    <Sun className="w-6 h-6 text-primary" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 0 : -90,
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute"
                >
                    <Moon className="w-6 h-6 text-primary" />
                </motion.div>
            </div>
        </button>
    );
}
