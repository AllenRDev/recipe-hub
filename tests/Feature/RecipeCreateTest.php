<?php

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to login from the create recipe page', function () {
    $this->get('/recipes/create')->assertRedirect(route('login'));
});

test('the create recipe page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/recipes/create');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('Recipes/Create'));
});

test('guests cannot store a recipe', function () {
    $this->post('/recipes', [])->assertRedirect(route('login'));

    expect(Recipe::count())->toBe(0);
});

test('authenticated users can create a recipe', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/recipes', [
        'title' => 'Spaghetti Bolognese',
        'description' => 'A hearty Italian classic.',
        'category' => 'Dinner',
        'prep_time' => 10,
        'cook_time' => 30,
        'servings' => 4,
        'image' => fakeImage(),
        'ingredients' => [
            ['amount' => '500g', 'name' => 'Spaghetti'],
            ['amount' => '250g', 'name' => 'Mince'],
        ],
        'instructions' => [
            ['step' => 'Boil the pasta.'],
            ['step' => 'Cook the sauce.'],
        ],
    ]);

    $recipe = Recipe::first();

    expect($recipe)->not->toBeNull();
    expect($recipe->title)->toBe('Spaghetti Bolognese');
    expect($recipe->user_id)->toBe($user->id);
    expect($recipe->ingredients)->toBe([
        ['amount' => '500g', 'name' => 'Spaghetti'],
        ['amount' => '250g', 'name' => 'Mince'],
    ]);
    expect($recipe->image)->toStartWith('recipes/');

    Storage::disk('public')->assertExists($recipe->image);

    $response
        ->assertRedirect(route('recipes.show', $recipe))
        ->assertSessionHas('success', 'Recipe created successfully!');
});

test('creating a recipe requires valid data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/recipes', []);

    $response->assertSessionHasErrors([
        'title',
        'description',
        'category',
        'prep_time',
        'cook_time',
        'servings',
        'image',
        'ingredients',
        'instructions',
    ]);

    expect(Recipe::count())->toBe(0);
});

test('recipe ingredients and instructions must have content', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/recipes', [
        'title' => 'Bad Recipe',
        'description' => 'Missing details.',
        'category' => 'Lunch',
        'prep_time' => 5,
        'cook_time' => 5,
        'servings' => 1,
        'image' => fakeImage(),
        'ingredients' => [
            ['amount' => '', 'name' => ''],
        ],
        'instructions' => [
            ['step' => ''],
        ],
    ]);

    $response->assertSessionHasErrors([
        'ingredients.0.amount',
        'ingredients.0.name',
        'instructions.0.step',
    ]);
});

test('the recipe category must be one of the allowed categories', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/recipes', [
        'title' => 'Weird Recipe',
        'description' => 'With an invalid category.',
        'category' => 'Not A Category',
        'prep_time' => 5,
        'cook_time' => 5,
        'servings' => 1,
        'image' => fakeImage(),
        'ingredients' => [['amount' => '1', 'name' => 'Thing']],
        'instructions' => [['step' => 'Do it.']],
    ]);

    $response->assertSessionHasErrors('category');

    expect(Recipe::count())->toBe(0);
});

test('the recipe image must be a valid image', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/recipes', [
        'title' => 'Bad Image',
        'description' => 'Not really an image.',
        'category' => 'Snack',
        'prep_time' => 5,
        'cook_time' => 5,
        'servings' => 1,
        'image' => UploadedFile::fake()->create('notes.txt', 1, 'text/plain'),
        'ingredients' => [['amount' => '1', 'name' => 'Thing']],
        'instructions' => [['step' => 'Do it.']],
    ]);

    $response->assertSessionHasErrors('image');

    expect(Recipe::count())->toBe(0);
});
