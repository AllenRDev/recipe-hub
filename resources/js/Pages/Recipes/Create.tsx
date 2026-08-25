import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecipeForm, { RecipeFormData } from '@/Components/Recipes/RecipeForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<RecipeFormData>(
        {
            title: '',
            description: '',
            category: '',
            prep_time: '',
            cook_time: '',
            servings: '',
            image: null,
            ingredients: [
                {
                    amount: '',
                    name: '',
                },
            ],
            instructions: [
                {
                    step: '',
                },
            ],
        }
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('recipes.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Recipe" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                        <div className="p-6 sm:p-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    Create a Recipe
                                </h1>

                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    Share one of your favorite recipes with the
                                    RecipeHub community.
                                </p>
                            </div>

                            <RecipeForm
                                data={data}
                                setData={setData}
                                processing={processing}
                                errors={errors}
                                submit={submit}
                                submitLabel="Publish Recipe"
                                processingLabel="Publishing..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
