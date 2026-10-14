import { useState } from 'react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import { PaginatedRecipes } from '@/types/recipes';
import { RECIPE_CATEGORIES } from '@/constants/recipeCategories';
import Pagination from '@/Components/Pagination';

interface Filters {
    search: string;
    category: string;
    sort: string;
}

interface Props {
    recipes: PaginatedRecipes;
    filters: Filters;
}

export default function Index({ recipes, filters }: Props) {
    const [search, setSearch] = useState(filters.search);

    const categories = ['All', ...RECIPE_CATEGORIES];

    const updateFilters = (values: {
        search?: string;
        category?: string;
        sort?: string;
    }) => {
        router.get(
            route('recipes.index'),
            {
                search: values.search ?? filters.search,
                category: values.category ?? filters.category,
                sort: values.sort ?? filters.sort,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <GuestLayout>
            <section className="bg-stone-50 py-16 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Explore Recipes
                        </h1>

                        <p className="mt-3 text-slate-600 dark:text-slate-300">
                            Discover recipes shared by the community.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 md:flex-row">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                updateFilters({ search });
                            }}
                            className="flex flex-1 gap-4"
                        >
                            <input
                                name="search"
                                placeholder="Search recipes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
                            >
                                Search
                            </button>
                        </form>

                        <select
                            value={filters.sort}
                            onChange={(e) =>
                                updateFilters({ sort: e.target.value })
                            }
                            className="rounded-xl border bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="az">A–Z</option>
                            <option value="za">Z–A</option>
                        </select>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() =>
                                    updateFilters({ category: item })
                                }
                                className={`rounded-full px-4 py-2 text-sm ${
                                    filters.category === item
                                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                                        : 'border border-gray-200 bg-white hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white hover:dark:bg-slate-700'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {recipes.data.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={recipes.current_page}
                        lastPage={recipes.last_page}
                        prevUrl={recipes.prev_page_url}
                        nextUrl={recipes.next_page_url}
                    />
                </div>
            </section>
        </GuestLayout>
    );
}
