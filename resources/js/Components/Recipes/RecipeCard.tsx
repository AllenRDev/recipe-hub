import { Link } from '@inertiajs/react';
import { Recipe } from '@/types/recipes';

interface Props {
    recipes: Recipe[];
}


interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    console.log(recipe);
    return (
        <div className="group rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl">
                {recipe.image ? (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex aspect-video items-center justify-center bg-orange-100 text-5xl dark:bg-orange-900/30">
                        🍳
                    </div>
                )}
            </div>

            <div className="mt-5">
                <span className="text-sm font-medium text-orange-500">
                    {recipe.category}
                </span>
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {recipe.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    By: {recipe.user.name}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>⭐ {recipe.ratings_avg_rating}</span>
                    <span>💬 {recipe.comments_count}{' '}
        {recipe.comments_count === 1 ? 'comment' : 'comments'}</span>
                </div>
            </div>

            {recipe.id && (
                <Link
                    href={route('recipes.show', recipe.id)}
                    className="margin-top-4 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                    View Recipe →
                </Link>
            )}
        </div>
    );
}
