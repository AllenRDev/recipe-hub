import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import { PaginatedRecipes } from '@/types/recipes';
import Pagination from '@/Components/Pagination';

interface Props {
    recipes: PaginatedRecipes;
}

export default function Favorites({ recipes }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Favorites" />

            <section className="bg-stone-50 py-16 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Your Favorites
                        </h1>

                        <p className="mt-3 text-slate-600 dark:text-slate-300">
                            Recipes you've saved to come back to later.
                        </p>
                    </div>

                    {recipes.data.length > 0 ? (
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {recipes.data.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                No favorites yet
                            </h2>

                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Save recipes you love and they'll show up here.
                            </p>
                        </div>
                    )}
                    <Pagination
                        currentPage={recipes.current_page}
                        lastPage={recipes.last_page}
                        prevUrl={recipes.prev_page_url}
                        nextUrl={recipes.next_page_url}
                    />
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
