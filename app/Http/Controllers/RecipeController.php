<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecipeRequest;
use App\Http\Requests\UpdateRecipeRequest;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $sort = $request->input('sort', 'newest');

        $query = Recipe::with('user')
            ->withCount('comments')
            ->withAvg('ratings', 'rating');

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            });
        }

        if ($category && $category !== 'All') {
            $query->where('category', $category);
        }

        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;

            case 'az':
                $query->orderBy('title');
                break;

            case 'za':
                $query->orderByDesc('title');
                break;

            case 'newest':
            default:
                $query->latest();
                break;
        }

        $recipes = $query
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes,
            'filters' => [
                'search' => $search ?? '',
                'category' => $category ?? 'All',
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    public function store(StoreRecipeRequest $request)
    {
        $validated = $request->validated();

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
        $recipe->load([
            'user',
            'comments.user',
        ]);

        $recipe->loadCount([
            'ratings',
            'comments',
        ]);

        $recipe->loadAvg('ratings', 'rating');

        $userRating = null;
        $isFavorited = false;

        if (auth()->check()) {
            $userRating = $recipe->ratings()
                ->where('user_id', auth()->id())
                ->value('rating');

            $isFavorited = auth()->user()
                ->favoriteRecipes()
                ->where('recipe_id', $recipe->id)
                ->exists();
        }

        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
            'userRating' => $userRating,
            'isFavorited' => $isFavorited,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        $this->authorize('update', $recipe);

        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecipeRequest $request, Recipe $recipe)
    {
        $this->authorize('update', $recipe);

        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                Storage::disk('public')->delete($recipe->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('recipes', 'public');
        } else {
            unset($validated['image']);
        }

        $recipe->update($validated);

        return redirect()
            ->route('recipes.show', $recipe)
            ->with('success', 'Recipe updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        $this->authorize('delete', $recipe);

        if ($recipe->image) {
            Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return redirect()
            ->route('recipes.index')
            ->with('success', 'Recipe deleted successfully!');
    }
}
