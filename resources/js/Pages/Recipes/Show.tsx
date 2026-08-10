import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import useAuth from '@/hooks/useAuth';
import { Recipe } from '../../types/recipe';

interface Props {
    recipe: Recipe;
}

export default function Show({ recipe }: Props) {
    const { isAuthenticated } = useAuth();

    return (
        <GuestLayout>
            <Head title={recipe.title} />

            <main className="bg-stone-50 py-12 dark:bg-slate-950">
                <div className="mx-auto max-w-5xl px-6">
                    {/* Back Button */}
                    <Link
                        href={route('recipes.index')}
                        className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                    >
                        ← Back to Recipes
                    </Link>

                    {/* Header Card */}
                    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
                        {/* Image */}
                        <div className="flex aspect-video items-center justify-center overflow-hidden bg-orange-100 text-7xl dark:bg-orange-500/10">
                            {recipe.image ? (
                                <img
                                    src={`/storage/${recipe.image}`}
                                    alt={recipe.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span>🍝</span>
                            )}
                        </div>

                        <div className="p-8">
                            <span className="text-sm font-medium text-orange-500">
                                {recipe.category}
                            </span>

                            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                                {recipe.title}
                            </h1>

                            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
                                {recipe.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-600 dark:text-slate-300">
                                {recipe.prep_time !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Prep:
                                        </strong>{' '}
                                        {recipe.prep_time} min
                                    </span>
                                )}

                                {recipe.cook_time !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Cook:
                                        </strong>{' '}
                                        {recipe.cook_time} min
                                    </span>
                                )}

                                {recipe.servings !== null && (
                                    <span>
                                        <strong className="text-slate-900 dark:text-white">
                                            Servings:
                                        </strong>{' '}
                                        {recipe.servings}
                                    </span>
                                )}

                                <span>
                                    <strong className="text-slate-900 dark:text-white">
                                        By:
                                    </strong>{' '}
                                    {recipe.user.name}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {/* Ingredients */}
                        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Ingredients
                            </h2>

                            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
                                {recipe.ingredients.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-2"
                                    >
                                        <span className="font-medium text-orange-500">
                                            •
                                        </span>

                                        <span>
                                            {item.amount} {item.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Instructions */}
                        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:col-span-2 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Instructions
                            </h2>

                            <ol className="mt-5 space-y-5 text-slate-600 dark:text-slate-300">
                                {recipe.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-4"
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                                {index + 1}
                                            </span>

                                            <span className="pt-1">
                                                {instruction.step}
                                            </span>
                                        </li>
                                    ),
                                )}
                            </ol>
                        </section>
                    </div>

                    {/* Comments */}
                    <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comments
                        </h2>

                        {isAuthenticated ? (
                            <>
                                <textarea
                                    placeholder="Share your thoughts..."
                                    className="mt-5 w-full rounded-xl border border-stone-300 bg-stone-50 p-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />

                                <button className="mt-3 rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600">
                                    Post Comment
                                </button>
                            </>
                        ) : (
                            <div>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Log in to leave a comment and join the
                                    conversation.
                                </p>

                                <Link
                                    href={route('login')}
                                    className="mt-3 inline-block rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                                >
                                    Login to Join the Conversation
                                </Link>
                            </div>
                        )}

                        <div className="mt-8 border-t border-stone-200 pt-5 dark:border-slate-700">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Comments will appear here once the comment
                                system is connected.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </GuestLayout>
    );
}