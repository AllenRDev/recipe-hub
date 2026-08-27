import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function About() {
    return (
        <>
            <Head title="About" />

            <GuestLayout>
                <section className="bg-stone-50 py-16 dark:bg-slate-950">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-12 dark:border-slate-700 dark:bg-slate-800">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                    About RecipeHub
                                </h1>

                                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    RecipeHub is a place to discover, share, and
                                    save recipes from a community of home cooks.
                                </p>

                                <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">
                                    Create your own recipes, explore dishes
                                    shared by other users, leave ratings and
                                    comments, and save your favorites for later.
                                    Whether you're looking for a quick weeknight
                                    dinner or something new to try, RecipeHub
                                    makes it easy to keep your recipes organized
                                    and discover something delicious.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:grid-cols-3">
                                <div className="rounded-2xl bg-stone-50 p-6 dark:bg-slate-700/50">
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Discover
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Browse recipes from the community and
                                        find something new to cook.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-stone-50 p-6 dark:bg-slate-700/50">
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Share
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Create and publish your own recipes for
                                        others to enjoy.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-stone-50 p-6 dark:bg-slate-700/50">
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Save
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Keep track of recipes you love with your
                                        personal favorites.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 border-t border-stone-200 pt-10 dark:border-slate-700">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Built With
                                </h2>

                                <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
                                    RecipeHub is a full-stack recipe-sharing
                                    application built with modern web
                                    technologies. The backend is powered by
                                    Laravel, while the frontend uses React,
                                    TypeScript, Inertia, and Tailwind CSS.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    {[
                                        'Laravel',
                                        'PHP',
                                        'React',
                                        'TypeScript',
                                        'Inertia.js',
                                        'Tailwind CSS',
                                        'SQLite',
                                    ].map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}