<?php

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can view a recipe', function () {
    $recipe = Recipe::factory()->create();

    $response = $this->get(route('recipes.show', $recipe));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Show')
        ->where('recipe.id', $recipe->id)
        ->where('userRating', null)
        ->where('isFavorited', false)
    );
});

test('a missing recipe returns a 404', function () {
    $this->get('/recipes/999999')->assertNotFound();
});

test('the recipe page includes comments with their authors and aggregate counts', function () {
    $recipe = Recipe::factory()->create();
    $commenter = User::factory()->create();
    Comment::factory()->create([
        'recipe_id' => $recipe->id,
        'user_id' => $commenter->id,
        'body' => 'Delicious!',
    ]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 4]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 5]);

    $response = $this->get(route('recipes.show', $recipe));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Show')
        ->where('recipe.comments_count', 1)
        ->where('recipe.ratings_count', 2)
        ->where('recipe.ratings_avg_rating', fn ($value) => round((float) $value, 1) === 4.5)
        ->where('recipe.comments.0.body', 'Delicious!')
        ->where('recipe.comments.0.user.id', $commenter->id)
    );
});

test('authenticated users see their own rating and favorite status', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();
    Rating::factory()->create([
        'recipe_id' => $recipe->id,
        'user_id' => $user->id,
        'rating' => 3,
    ]);
    $user->favoriteRecipes()->attach($recipe->id);

    $response = $this->actingAs($user)->get(route('recipes.show', $recipe));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Show')
        ->where('userRating', 3)
        ->where('isFavorited', true)
    );
});

test('authenticated users with no rating or favorite see defaults', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $response = $this->actingAs($user)->get(route('recipes.show', $recipe));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Show')
        ->where('userRating', null)
        ->where('isFavorited', false)
    );
});
