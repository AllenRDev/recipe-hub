<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category' => ['required', 'string', 'max:100', Rule::in(config('recipes.categories'))],

            'prep_time' => ['required', 'integer', 'min:0'],
            'cook_time' => ['required', 'integer', 'min:0'],
            'servings' => ['required', 'integer', 'min:1'],

            'image' => ['nullable', 'image', 'max:5120'],

            'ingredients' => ['required', 'array', 'min:1'],
            'ingredients.*.amount' => ['required', 'string', 'max:100'],
            'ingredients.*.name' => ['required', 'string', 'max:255'],

            'instructions' => ['required', 'array', 'min:1'],
            'instructions.*.step' => ['required', 'string'],
        ];
    }

    /**
     * Get the custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a recipe name.',
            'description.required' => 'Please add a description for your recipe.',
            'category.required' => 'Please select a category.',
            'category.in' => 'Please select a valid category.',

            'image.image' => 'The recipe image must be a valid image.',
            'image.max' => 'The recipe image must be smaller than 5 MB.',

            'ingredients.required' => 'Please add at least one ingredient.',
            'ingredients.min' => 'Please add at least one ingredient.',
            'ingredients.*.amount.required' => 'Please enter an amount.',
            'ingredients.*.name.required' => 'Please enter an ingredient name.',

            'instructions.required' => 'Please add at least one instruction.',
            'instructions.min' => 'Please add at least one instruction.',
            'instructions.*.step.required' => 'Please enter an instruction.',
        ];
    }
}
