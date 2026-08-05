import { Link } from '@inertiajs/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
                {/* Brand */}
                <div className="md:col-span-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold"
                    >
                        <span className="text-2xl">🍳</span>
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                            RecipeHub
                        </span>
                    </Link>

                    <p className="mt-4 max-w-md text-sm text-gray-600 dark:text-gray-300">
                        Discover, create, and share amazing recipes with a
                        community of food lovers.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-gray-600 dark:text-gray-300">
                        Explore
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>
                            <Link
                                href="/recipes"
                                className="hover:text-orange-500"
                            >
                                Recipes
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/categories"
                                className="hover:text-orange-500"
                            >
                                Categories
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/favorites"
                                className="hover:text-orange-500"
                            >
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold text-gray-600 dark:text-gray-300">
                        Connect
                    </h3>

                    <div className="mt-4 flex gap-4">
                        <a
                            href="#"
                            className="text-gray-600 transition hover:text-orange-500 dark:text-gray-300"
                        >
                            <FaGithub size={22} />
                        </a>

                        <a
                            href="#"
                            className="text-gray-600 transition hover:text-orange-500 dark:text-gray-300"
                        >
                            <FaLinkedin size={22} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} RecipeHub. All rights reserved.
            </div>
        </footer>
    );
}
