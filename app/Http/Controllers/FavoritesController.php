<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FavoritesController extends Controller
{
    public function index()
    {
        $recipes = auth()->user()
            ->favoriteRecipes()
            ->with('user')
            ->withCount('comments')
            ->withAvg('ratings', 'rating')
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Recipes/Favorites', [
            'recipes' => $recipes,
        ]);
    }
}