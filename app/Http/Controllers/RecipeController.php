<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('user')
            ->latest()
            ->get();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'category' => ['required', 'string', 'max:100'],

        'prep_time' => ['nullable', 'integer', 'min:0'],
        'cook_time' => ['nullable', 'integer', 'min:0'],
        'servings' => ['nullable', 'integer', 'min:1'],

        'image' => ['nullable', 'image', 'max:5120'],

        'ingredients' => ['required', 'array', 'min:1'],
        'ingredients.*.amount' => ['required', 'string', 'max:100'],
        'ingredients.*.name' => ['required', 'string', 'max:255'],

        'instructions' => ['required', 'array', 'min:1'],
        'instructions.*.step' => ['required', 'string'],
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request
            ->file('image')
            ->store('recipes', 'public');
    }

    $recipe = $request->user()->recipes()->create($validated);

    return redirect()
        ->route('recipes.show', $recipe)
        ->with('success', 'Recipe created successfully!');
}

   public function show(Recipe $recipe)
    {
        $recipe->load('user');

        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        //
    }
}
