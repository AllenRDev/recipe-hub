<?php

use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot favorite a recipe', function () {
    $recipe = Recipe::factory()->create();

    $this->post(route('recipes.favorite', $recipe))->assertRedirect(route('login'));

    $this->assertDatabaseCount('recipe_user', 0);
});

test('authenticated users can favorite a recipe', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('recipes.show', $recipe))
        ->post(route('recipes.favorite', $recipe));

    $response->assertRedirect(route('recipes.show', $recipe));

    $this->assertDatabaseHas('recipe_user', [
        'user_id' => $user->id,
        'recipe_id' => $recipe->id,
    ]);
});

test('favoriting a recipe twice does not create duplicate rows', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)->post(route('recipes.favorite', $recipe));
    $this->actingAs($user)->post(route('recipes.favorite', $recipe));

    $this->assertDatabaseCount('recipe_user', 1);
});

test('authenticated users can unfavorite a recipe', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();
    $user->favoriteRecipes()->attach($recipe->id);

    $response = $this->actingAs($user)
        ->from(route('recipes.show', $recipe))
        ->delete(route('recipes.unfavorite', $recipe));

    $response->assertRedirect(route('recipes.show', $recipe));

    $this->assertDatabaseCount('recipe_user', 0);
});

test('unfavoriting a recipe that is not favorited is harmless', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)->delete(route('recipes.unfavorite', $recipe));

    $this->assertDatabaseCount('recipe_user', 0);
});

test('guests are redirected to login from the favorites page', function () {
    $this->get(route('favorites.index'))->assertRedirect(route('login'));
});

test('the favorites page lists only favorited recipes', function () {
    $user = User::factory()->create();
    $favorited = Recipe::factory()->create();
    Recipe::factory()->create();

    $user->favoriteRecipes()->attach($favorited->id);

    $response = $this->actingAs($user)->get(route('favorites.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Favorites')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.id', $favorited->id)
    );
});

test('the favorites page paginates six recipes per page', function () {
    $user = User::factory()->create();
    $recipes = Recipe::factory()->count(7)->create();
    $user->favoriteRecipes()->attach($recipes->pluck('id'));

    $response = $this->actingAs($user)->get(route('favorites.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Favorites')
        ->has('recipes.data', 6)
        ->where('recipes.total', 7)
    );
});
