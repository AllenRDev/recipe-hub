import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import IngredientInput from '@/Components/Recipes/IngredientInput';
import InstructionInput from '@/Components/Recipes/InstructionInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        image: null as File | null,
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
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('recipes.store'), {
            forceFormData: true,
        });
    };

    const addIngredient = () => {
        setData('ingredients', [
            ...data.ingredients,
            {
                amount: '',
                name: '',
            },
        ]);
    };

    const updateIngredient = (
        index: number,
        field: 'amount' | 'name',
        value: string,
    ) => {
        setData(
            'ingredients',
            data.ingredients.map((ingredient, i) =>
                i === index
                    ? {
                          ...ingredient,
                          [field]: value,
                      }
                    : ingredient,
            ),
        );
    };

    const removeIngredient = (index: number) => {
        setData(
            'ingredients',
            data.ingredients.filter((_, i) => i !== index),
        );
    };

    const addInstruction = () => {
    setData('instructions', [
        ...data.instructions,
        {
            step: '',
        },
    ]);
};

const updateInstruction = (index: number, value: string) => {
    setData(
        'instructions',
        data.instructions.map((instruction, i) =>
            i === index
                ? {
                      ...instruction,
                      step: value,
                  }
                : instruction,
        ),
    );
};

const removeInstruction = (index: number) => {
    setData(
        'instructions',
        data.instructions.filter((_, i) => i !== index),
    );
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

                            <form
                                onSubmit={submit}
                                className="space-y-8"
                            >
                                {/* Basic Recipe Information */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Recipe Name"
                                            className="font-medium text-slate-700 dark:text-slate-200"
                                        />

                                        <TextInput
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData(
                                                    'title',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-2 block w-full"
                                            placeholder="e.g. Homemade Chicken Alfredo"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="category"
                                            value="Category"
                                            className="font-medium text-slate-700 dark:text-slate-200"
                                        />

                                        <TextInput
                                            id="category"
                                            name="category"
                                            type="text"
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    'category',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-2 block w-full"
                                            placeholder="e.g. Italian"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                            className="font-medium text-slate-700 dark:text-slate-200"
                                        />

                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            placeholder="Tell us a little about this recipe..."
                                            className="
                                                mt-2
                                                block
                                                w-full
                                                rounded-xl
                                                border
                                                border-stone-300
                                                bg-stone-50
                                                px-4
                                                py-3
                                                text-slate-900
                                                shadow-sm
                                                outline-none
                                                transition
                                                placeholder:text-slate-400
                                                focus:border-orange-500
                                                focus:ring-orange-500
                                                dark:border-slate-600
                                                dark:bg-slate-900
                                                dark:text-white
                                                dark:placeholder:text-slate-500
                                            "
                                        />
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-3">
                                        <div>
                                            <InputLabel
                                                htmlFor="prep_time"
                                                value="Prep Time (min)"
                                                className="font-medium text-slate-700 dark:text-slate-200"
                                            />

                                            <TextInput
                                                id="prep_time"
                                                name="prep_time"
                                                type="number"
                                                min="0"
                                                value={data.prep_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'prep_time',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-2 block w-full"
                                                placeholder="15"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="cook_time"
                                                value="Cook Time (min)"
                                                className="font-medium text-slate-700 dark:text-slate-200"
                                            />

                                            <TextInput
                                                id="cook_time"
                                                name="cook_time"
                                                type="number"
                                                min="0"
                                                value={data.cook_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'cook_time',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-2 block w-full"
                                                placeholder="30"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="servings"
                                                value="Servings"
                                                className="font-medium text-slate-700 dark:text-slate-200"
                                            />

                                            <TextInput
                                                id="servings"
                                                name="servings"
                                                type="number"
                                                min="1"
                                                value={data.servings}
                                                onChange={(e) =>
                                                    setData(
                                                        'servings',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-2 block w-full"
                                                placeholder="4"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="border-t border-stone-200 pt-8 dark:border-slate-700">
                                    <div className="mb-5">
                                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                            Ingredients
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            Add the ingredients needed to make
                                            your recipe.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {data.ingredients.map(
                                            (ingredient, index) => (
                                                <IngredientInput
                                                    key={index}
                                                    amount={ingredient.amount}
                                                    name={ingredient.name}
                                                    onAmountChange={(value) =>
                                                        updateIngredient(
                                                            index,
                                                            'amount',
                                                            value,
                                                        )
                                                    }
                                                    onNameChange={(value) =>
                                                        updateIngredient(
                                                            index,
                                                            'name',
                                                            value,
                                                        )
                                                    }
                                                    onRemove={() =>
                                                        removeIngredient(index)
                                                    }
                                                    canRemove={
                                                        data.ingredients
                                                            .length > 1
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addIngredient}
                                        className="
                                            mt-5
                                            rounded-xl
                                            border
                                            border-orange-500
                                            px-4
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-orange-600
                                            transition
                                            hover:bg-orange-50
                                            dark:border-orange-400
                                            dark:text-orange-400
                                            dark:hover:bg-orange-500/10
                                        "
                                    >
                                        + Add Ingredient
                                    </button>
                                </div>

                                <div className="border-t border-stone-200 pt-8 dark:border-slate-700">
    <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Instructions
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Walk the community through your recipe step by step.
        </p>
    </div>

    <div className="space-y-5">
        {data.instructions.map((instruction, index) => (
            <InstructionInput
                key={index}
                step={index + 1}
                instruction={instruction.step}
                onChange={(value) =>
                    updateInstruction(index, value)
                }
                onRemove={() => removeInstruction(index)}
                canRemove={data.instructions.length > 1}
            />
        ))}
    </div>

    <button
        type="button"
        onClick={addInstruction}
        className="
            mt-5
            rounded-xl
            border
            border-orange-500
            px-4
            py-2
            text-sm
            font-semibold
            text-orange-600
            transition
            hover:bg-orange-50
            dark:border-orange-400
            dark:text-orange-400
            dark:hover:bg-orange-500/10
        "
    >
        + Add Step
    </button>
</div>

                                {/* Submit */}
                                <div className="flex justify-end border-t border-stone-200 pt-6 dark:border-slate-700">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="
                                            rounded-xl
                                            bg-orange-500
                                            px-6
                                            py-3
                                            font-semibold
                                            text-white
                                            shadow-sm
                                            transition
                                            hover:bg-orange-600
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {processing
                                            ? 'Publishing...'
                                            : 'Publish Recipe'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
