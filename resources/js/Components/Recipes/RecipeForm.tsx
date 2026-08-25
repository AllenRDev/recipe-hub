import { FormEvent, ReactNode } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import IngredientInput from '@/Components/Recipes/IngredientInput';
import InstructionInput from '@/Components/Recipes/InstructionInput';
import { RECIPE_CATEGORIES } from '@/constants/recipeCategories';

export interface RecipeFormData {
    title: string;
    description: string;
    category: string;
    prep_time: string;
    cook_time: string;
    servings: string;
    image: File | null;
    ingredients: {
        amount: string;
        name: string;
    }[];
    instructions: {
        step: string;
    }[];
}

interface RecipeFormProps {
    data: RecipeFormData;
    setData: <K extends keyof RecipeFormData>(
        key: K,
        value: RecipeFormData[K]
    ) => void;
    processing: boolean;
    errors: Record<string, string>;
    submit: (e: FormEvent) => void;
    submitLabel: string;
    processingLabel: string;
    existingImage?: string | null;
    children?: ReactNode;
}

export default function RecipeForm({
    data,
    setData,
    processing,
    submit,
    submitLabel,
    processingLabel,
    existingImage,
}: RecipeFormProps) {

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
        value: string
    ) => {
        setData(
            'ingredients',
            data.ingredients.map((ingredient, i) =>
                i === index
                    ? {
                          ...ingredient,
                          [field]: value,
                      }
                    : ingredient
            )
        );
    };

    const removeIngredient = (index: number) => {
        setData(
            'ingredients',
            data.ingredients.filter((_, i) => i !== index)
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
                    : instruction
            )
        );
    };

    const removeInstruction = (index: number) => {
        setData(
            'instructions',
            data.instructions.filter((_, i) => i !== index)
        );
    };

    return (
        <form onSubmit={submit} className="space-y-8">
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
                        onChange={(e) => setData('title', e.target.value)}
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

                    <select
    value={data.category}
    onChange={(e) => setData('category', e.target.value)}
    className="w-full rounded-xl border bg-stone-100 px-4 py-3 border-stone-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
>
    <option value="">Select a category</option>

    {RECIPE_CATEGORIES.map((category) => (
        <option key={category} value={category}>
            {category}
        </option>
    ))}
</select>
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
                        onChange={(e) => setData('description', e.target.value)}
                        rows={4}
                        placeholder="Tell us a little about this recipe..."
                        className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
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
                                setData('prep_time', e.target.value)
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
                                setData('cook_time', e.target.value)
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
                                setData('servings', e.target.value)
                            }
                            className="mt-2 block w-full"
                            placeholder="4"
                        />
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="border-t border-stone-200 pt-8 dark:border-slate-700">
                <InputLabel
                    htmlFor="image"
                    value="Recipe Image"
                    className="font-medium text-slate-700 dark:text-slate-200"
                />

                {existingImage && (
                    <div className="mt-4">
                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                            Current image
                        </p>

                        <img
                            src={`/storage/${existingImage}`}
                            alt="Current recipe"
                            className="h-48 w-full rounded-xl object-cover sm:w-72"
                        />
                    </div>
                )}

                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setData('image', e.target.files?.[0] ?? null)
                    }
                    className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-orange-600 dark:text-slate-300"
                />

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Leave this blank to keep the current image.
                </p>
            </div>

            {/* Ingredients */}
            <div className="border-t border-stone-200 pt-8 dark:border-slate-700">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Ingredients
                    </h2>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Add the ingredients needed to make your recipe.
                    </p>
                </div>

                <div className="space-y-4">
                    {data.ingredients.map((ingredient, index) => (
                        <IngredientInput
                            key={index}
                            amount={ingredient.amount}
                            name={ingredient.name}
                            onAmountChange={(value) =>
                                updateIngredient(index, 'amount', value)
                            }
                            onNameChange={(value) =>
                                updateIngredient(index, 'name', value)
                            }
                            onRemove={() => removeIngredient(index)}
                            canRemove={data.ingredients.length > 1}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-5 rounded-xl border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500/10"
                >
                    + Add Ingredient
                </button>
            </div>

            {/* Instructions */}
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
                    className="mt-5 rounded-xl border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500/10"
                >
                    + Add Step
                </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end border-t border-stone-200 pt-6 dark:border-slate-700">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? processingLabel : submitLabel}
                </button>
            </div>
        </form>
    );
}
