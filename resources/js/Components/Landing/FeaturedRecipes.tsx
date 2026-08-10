import RecipeCard from '@/Components/Recipes/RecipeCard';
import { Recipe } from '@/types/recipe';

interface Props {
    recipes: Recipe[];
}

export default function FeaturedRecipes({ recipes }: Props) {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Featured Recipes
                    </h2>

                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Check out some of the latest recipes from the community.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </section>
    );
}