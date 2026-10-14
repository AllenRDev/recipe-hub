<?php

use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;

test('guests cannot rate a recipe', function () {
    $recipe = Recipe::factory()->create();

    $this->post(route('recipes.rating.store', $recipe), ['rating' => 5])
        ->assertRedirect(route('login'));

    $this->assertDatabaseCount('ratings', 0);
});

test('authenticated users can rate a recipe', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('recipes.show', $recipe))
        ->post(route('recipes.rating.store', $recipe), ['rating' => 5]);

    $response->assertRedirect(route('recipes.show', $recipe));

    $this->assertDatabaseHas('ratings', [
        'user_id' => $user->id,
        'recipe_id' => $recipe->id,
        'rating' => 5,
    ]);
});

test('rating a recipe again updates the existing rating', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();
    Rating::factory()->create([
        'user_id' => $user->id,
        'recipe_id' => $recipe->id,
        'rating' => 5,
    ]);

    $this->actingAs($user)->post(route('recipes.rating.store', $recipe), ['rating' => 2]);

    $this->assertDatabaseCount('ratings', 1);
    $this->assertDatabaseHas('ratings', [
        'user_id' => $user->id,
        'recipe_id' => $recipe->id,
        'rating' => 2,
    ]);
});

test('a rating must be between one and five', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    foreach ([0, 6, 'abc'] as $invalid) {
        $this->actingAs($user)
            ->from(route('recipes.show', $recipe))
            ->post(route('recipes.rating.store', $recipe), ['rating' => $invalid])
            ->assertSessionHasErrors('rating');
    }

    $this->assertDatabaseCount('ratings', 0);
});

test('a rating is required', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)
        ->post(route('recipes.rating.store', $recipe), [])
        ->assertSessionHasErrors('rating');
});
