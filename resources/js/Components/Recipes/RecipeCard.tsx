import { Link } from '@inertiajs/react';
import { Recipe } from '@/types/recipes';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <div className="group rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl">
                {recipe.image ? (
                    <img
                        src={`/storage/${recipe.image}`}
                        alt={recipe.title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="flex aspect-video items-center justify-center bg-orange-100 text-5xl dark:bg-orange-900/30"
                    >
                        🍳
                    </div>
                )}
            </div>

            <div className="mt-5">
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    <Link
                        href={route('recipes.show', recipe.id)}
                        className="transition hover:text-orange-500 dark:hover:text-orange-400"
                    >
                        {recipe.title}
                    </Link>
                </h3>
                <Link
                    href={route('users.show', recipe.user.id)}
                    className="font-medium text-slate-700 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                >
                    {recipe.user.name}
                </Link>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>
                        <span aria-hidden="true">⭐</span>{' '}
                        {recipe.ratings_avg_rating
                            ? recipe.ratings_avg_rating + '/5'
                            : 'No ratings'}
                    </span>
                    <span>
                        <span aria-hidden="true">💬</span>{' '}
                        {recipe.comments_count}{' '}
                        {recipe.comments_count === 1 ? 'comment' : 'comments'}
                    </span>
                </div>
            </div>

            {recipe.id && (
                <Link
                    href={route('recipes.show', recipe.id)}
                    aria-label={`View recipe: ${recipe.title}`}
                    className="mt-4 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                    View Recipe →
                </Link>
            )}
        </div>
    );
}
