import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecipeForm, { RecipeFormData } from '@/Components/Recipes/RecipeForm';
import { Recipe } from '@/types/recipes';

interface Props {
    recipe: Recipe;
}

export default function Edit({ recipe }: Props) {
    const { data, setData, post, processing, errors } = useForm<
        RecipeFormData & { _method: string }
    >({
        _method: 'PUT',
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        prep_time: recipe.prep_time?.toString() ?? '',
        cook_time: recipe.cook_time?.toString() ?? '',
        servings: recipe.servings?.toString() ?? '',
        image: null,
        ingredients: recipe.ingredients.map((ingredient) => ({
            amount: ingredient.amount,
            name: ingredient.name,
        })),
        instructions: recipe.instructions.map((instruction) => ({
            step: instruction.step,
        })),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('recipes.update', recipe.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${recipe.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                        <div className="p-6 sm:p-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    Edit Recipe
                                </h1>

                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    Update your recipe and keep it fresh for the
                                    RecipeHub community.
                                </p>
                            </div>

                            <RecipeForm
                                data={data}
                                setData={setData}
                                processing={processing}
                                errors={errors}
                                submit={submit}
                                submitLabel="Save Changes"
                                processingLabel="Saving..."
                                existingImage={recipe.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
