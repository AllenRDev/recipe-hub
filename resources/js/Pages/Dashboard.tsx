import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import Pagination from '@/Components/Pagination';
import { PaginatedRecipes } from '@/types/recipes';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        profile_image: string | null;
        profile_url: string | undefined;
    };
    recipes: PaginatedRecipes;
}

export default function Dashboard({ user, recipes }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Account" />

            <main className="bg-stone-50 py-12 dark:bg-slate-950">
                <div className="mx-auto max-w-6xl px-6">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Your Account
                    </h1>

                    <p className="mt-2 mb-4 text-slate-600 dark:text-slate-300">
                        Manage your profile, recipes, ratings, and activity.
                    </p>

                    <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-5">
                                {/* Profile Picture */}
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-3xl font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                    {user.profile_image ? (
                                        <img
                                            src={user.profile_url}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        user.name.charAt(0).toUpperCase()
                                    )}
                                </div>

                                {/* User Info */}
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {user.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {user.email}
                                    </p>

                                    <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
                                        {user.bio || 'No bio added yet.'}
                                    </p>
                                </div>
                            </div>

                            {/* Edit Profile */}
                            <Link
                                href={route('profile.edit')}
                                className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-stone-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </section>
                    <section className="mt-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Your Recipes
                                </h2>

                                <p className="mt-1 text-slate-600 dark:text-slate-300">
                                    Recipes you've shared with the community.
                                </p>
                            </div>

                            <Link
                                href={route('recipes.create')}
                                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                            >
                                Create Recipe
                            </Link>
                        </div>

                        {recipes.data.length > 0 ? (
                            <>
                                <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {recipes.data.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                        />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={recipes.current_page}
                                    lastPage={recipes.last_page}
                                    prevUrl={recipes.prev_page_url}
                                    nextUrl={recipes.next_page_url}
                                />
                            </>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    You haven't posted any recipes yet.
                                </h3>

                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    Share your first recipe with the RecipeHub
                                    community.
                                </p>

                                <Link
                                    href={route('recipes.create')}
                                    className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                                >
                                    Create Your First Recipe
                                </Link>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
