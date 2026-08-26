<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\RedirectResponse;

class FavoriteController extends Controller
{
    public function store(Recipe $recipe): RedirectResponse
    {
        auth()->user()->favoriteRecipes()->syncWithoutDetaching([
            $recipe->id,
        ]);

        return back();
    }

    public function destroy(Recipe $recipe): RedirectResponse
    {
        auth()->user()->favoriteRecipes()->detach($recipe->id);

        return back();
    }
}