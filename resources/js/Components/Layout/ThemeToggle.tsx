import { useTheme } from '@/Contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
        >
            {darkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
}
