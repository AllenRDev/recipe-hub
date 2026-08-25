import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import { Recipe } from '@/types/recipes';
import type { User } from '@/types';

interface Props {
    user: User & {
        recipes: Recipe[];
    };
}

export default function Show({ user }: Props) {
    return (
        <>
            <Head title={`${user.name}'s Profile`} />

            <GuestLayout>
                <section className="bg-stone-50 py-16 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                                {user.profile_url ? (
                                    <img
                                        src={user.profile_url}
                                        alt={user.name}
                                        className="h-32 w-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div className="mt-6 sm:ml-8 sm:mt-2">
                                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                        {user.name}
                                    </h1>

                                    {user.bio && (
                                        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                                            {user.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {user.name}'s Recipes
                            </h2>

                            {user.recipes.length > 0 ? (
                                <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {user.recipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-6 text-slate-600 dark:text-slate-300">
                                    This user hasn't posted any recipes yet.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}