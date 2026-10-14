<?php

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

function validRecipePayload(array $overrides = []): array
{
    return array_merge([
        'title' => 'Updated Title',
        'description' => 'Updated description.',
        'category' => 'Lunch',
        'prep_time' => 5,
        'cook_time' => 15,
        'servings' => 2,
        'ingredients' => [['amount' => '1', 'name' => 'Thing']],
        'instructions' => [['step' => 'Do the thing.']],
    ], $overrides);
}

test('guests are redirected to login from the edit page', function () {
    $recipe = Recipe::factory()->create();

    $this->get(route('recipes.edit', $recipe))->assertRedirect(route('login'));
});

test('the owner can view the edit page', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('recipes.edit', $recipe));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Edit')
        ->where('recipe.id', $recipe->id)
    );
});

test('non owners cannot view the edit page', function () {
    $recipe = Recipe::factory()->create();
    $other = User::factory()->create();

    $this->actingAs($other)->get(route('recipes.edit', $recipe))->assertForbidden();
});

test('guests cannot update a recipe', function () {
    $recipe = Recipe::factory()->create();

    $this->patch(route('recipes.update', $recipe), [])->assertRedirect(route('login'));
});

test('non owners cannot update a recipe', function () {
    $recipe = Recipe::factory()->create();
    $other = User::factory()->create();

    $this->actingAs($other)
        ->patch(route('recipes.update', $recipe), validRecipePayload())
        ->assertForbidden();
});

test('the owner can update a recipe without changing the image', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create([
        'user_id' => $user->id,
        'image' => 'recipes/original.jpg',
    ]);

    $response = $this->actingAs($user)
        ->patch(route('recipes.update', $recipe), validRecipePayload(['title' => 'A New Name']));

    $recipe->refresh();

    expect($recipe->title)->toBe('A New Name');
    expect($recipe->image)->toBe('recipes/original.jpg');

    $response
        ->assertRedirect(route('recipes.show', $recipe))
        ->assertSessionHas('success', 'Recipe updated successfully!');
});

test('the owner can update a recipe with a new image', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create([
        'user_id' => $user->id,
        'image' => 'recipes/original.jpg',
    ]);

    $response = $this->actingAs($user)->patch(
        route('recipes.update', $recipe),
        validRecipePayload(['image' => fakeImage('new.png')])
    );

    $recipe->refresh();

    expect($recipe->image)->toStartWith('recipes/');
    expect($recipe->image)->not->toBe('recipes/original.jpg');
    Storage::disk('public')->assertExists($recipe->image);

    $response->assertRedirect(route('recipes.show', $recipe));
});

test('updating a recipe validates its data', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)
        ->patch(route('recipes.update', $recipe), ['title' => '']);

    $response->assertSessionHasErrors(['title', 'description', 'category']);
});

test('guests cannot delete a recipe', function () {
    $recipe = Recipe::factory()->create();

    $this->delete(route('recipes.destroy', $recipe))->assertRedirect(route('login'));

    expect(Recipe::find($recipe->id))->not->toBeNull();
});

test('non owners cannot delete a recipe', function () {
    $recipe = Recipe::factory()->create();
    $other = User::factory()->create();

    $this->actingAs($other)
        ->delete(route('recipes.destroy', $recipe))
        ->assertForbidden();

    expect(Recipe::find($recipe->id))->not->toBeNull();
});

test('the owner can delete a recipe', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->delete(route('recipes.destroy', $recipe));

    $response
        ->assertRedirect(route('recipes.index'))
        ->assertSessionHas('success', 'Recipe deleted successfully!');

    expect(Recipe::find($recipe->id))->toBeNull();
});
