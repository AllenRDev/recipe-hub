import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-stone-50 py-20 dark:bg-slate-950">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
                {/* Text */}
                <div>
                    <div className="mb-6 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                        🍳 A community for food lovers
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Share recipes.
                        <br />
                        Discover favorites.
                        <br />
                        Cook together.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                        RecipeHub makes it easy to create, discover, and share
                        recipes with a community of home cooks.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/recipes"
                            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                            Browse Recipes
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Visual */}
                <div className="relative">
                    <div className="group rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl dark:bg-slate-900">
                        <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-200 to-yellow-100 dark:from-orange-900 dark:to-slate-800" />

                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Homemade Pasta
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                ⭐⭐⭐⭐⭐ · 124 ratings
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
