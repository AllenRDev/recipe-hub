import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from './ThemeToggle';
import useAuth from '@/hooks/useAuth';

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white backdrop-blur-md dark:border-slate-700 dark:bg-slate-900">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                    <span className="text-2xl">🍳</span>
                    <span className="text-gray-600 dark:text-gray-300">
                        RecipeHub
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/recipes"
                        className="text-gray-600 hover:text-orange-500 dark:text-gray-300"
                    >
                        Browse
                    </Link>
                    <Link
                        href="/categories"
                        className="text-gray-600 hover:text-orange-500 dark:text-gray-300"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-600 hover:text-orange-500 dark:text-gray-300"
                    >
                        About
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <>
                            <Link
                                href={route('recipes.create')}
                                className="rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                Create Recipe
                            </Link>

                            <Link
                                href="/dashboard"
                                className="rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
