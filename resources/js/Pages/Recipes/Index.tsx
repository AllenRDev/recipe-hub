import { useState } from 'react';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import RecipeCard from '@/Components/Recipes/RecipeCard';
import { Recipe } from '@/types/recipes';

interface Props {
    recipes: Recipe[];
}


export default function Index({ recipes }: Props) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const categories = [
    'All',
    ...Array.from(
        new Set(recipes.map((recipe) => recipe.category)),
    ),
];

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === 'All' || recipe.category === category;

        return matchesSearch && matchesCategory;
    });

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
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {categories.map((item) => (
                            <button
                                key={item}
                                onClick={() => setCategory(item)}
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
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
