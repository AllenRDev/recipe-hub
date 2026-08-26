import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import { Recipe } from '@/types/recipes';
import { RECIPE_CATEGORIES } from '@/constants/recipeCategories';

interface Props {
    recipes: Recipe[];
}

export default function Index({ recipes }: Props) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

    const recipesPerPage = 6;

    const categories = ['All', ...RECIPE_CATEGORIES];

    const filteredRecipes = recipes
    .filter((recipe) => {
        const matchesSearch = recipe.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === 'All' || recipe.category === category;

        return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
        switch (sort) {
            case 'oldest':
                return a.id - b.id;

            case 'az':
                return a.title.localeCompare(b.title);

            case 'za':
                return b.title.localeCompare(a.title);

            case 'newest':
            default:
                return b.id - a.id;
        }
    });

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage,
);

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

                    <div className="mt-8 flex gap-4">
    <input
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
}}
        className="w-full rounded-xl border bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />

    <select
        value={sort}
        onChange={(e) => {
    setSort(e.target.value);
    setCurrentPage(1);
}}
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
                                onClick={() => {
    setCategory(item);
    setCurrentPage(1);
}}
                                className={`rounded-full px-4 py-2 text-sm ${
                                    category === item
                                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                                        : 'border border-gray-200 bg-white hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white hover:dark:bg-slate-700'
                                } `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </section>
            {totalPages > 1 && (
    <div className="mt-10 flex items-center justify-center gap-2">
        <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
            Previous
        </button>

        <span className="px-4 text-sm text-slate-600 dark:text-slate-300">
            Page {currentPage} of {totalPages}
        </span>

        <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
            Next
        </button>
    </div>
)}
        </GuestLayout>
    );
}
