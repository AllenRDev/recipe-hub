<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        Rating::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'recipe_id' => $recipe->id,
            ],
            [
                'rating' => $validated['rating'],
            ]
        );

        return back();
    }
}