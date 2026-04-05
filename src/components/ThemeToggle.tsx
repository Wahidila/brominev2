import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
            document.documentElement.classList.add("light");
            setIsDark(false);
        } else {
            document.documentElement.classList.remove("light");
            setIsDark(true);
        }
    }, []);

    const toggle = () => {
        if (isDark) {
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <motion.button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
    );
};

export default ThemeToggle;
