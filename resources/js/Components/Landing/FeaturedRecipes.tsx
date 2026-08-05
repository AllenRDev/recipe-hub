import RecipeCard from '@/Components/Recipes/RecipeCard';
import { recipes } from '@/data/recipes';

export default function FeaturedRecipes() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    {recipes.slice(0, 3).map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </section>
    );
}
