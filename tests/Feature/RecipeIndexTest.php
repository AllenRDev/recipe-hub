<?php

use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can browse recipes', function () {
    Recipe::factory()->count(3)->create();

    $response = $this->get('/recipes');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 3)
    );
});

test('authenticated users can browse recipes', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(3)->create();

    $response = $this->actingAs($user)->get('/recipes');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 3)
        ->where('filters.search', '')
        ->where('filters.category', 'All')
        ->where('filters.sort', 'newest')
    );
});

test('recipes index paginates six recipes per page', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(8)->create();

    $response = $this->actingAs($user)->get('/recipes');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 6)
        ->where('recipes.total', 8)
        ->where('recipes.per_page', 6)
    );
});

test('recipes can be searched by title', function () {
    $user = User::factory()->create();
    $match = Recipe::factory()->create(['title' => 'Chicken Curry']);
    Recipe::factory()->create(['title' => 'Beef Stew']);

    $response = $this->actingAs($user)->get('/recipes?search=Chicken');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.id', $match->id)
        ->where('filters.search', 'Chicken')
    );
});

test('recipes can be searched by description', function () {
    $user = User::factory()->create();
    $match = Recipe::factory()->create([
        'title' => 'Weeknight Dinner',
        'description' => 'A quick and creamy mushroom risotto.',
    ]);
    Recipe::factory()->create([
        'title' => 'Mushroom Soup',
        'description' => 'Comforting and warm.',
    ]);

    $response = $this->actingAs($user)->get('/recipes?search=risotto');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.id', $match->id)
    );
});

test('recipes can be filtered by category', function () {
    $user = User::factory()->create();
    Recipe::factory()->create(['category' => 'Dinner']);
    Recipe::factory()->count(2)->create(['category' => 'Dessert']);

    $response = $this->actingAs($user)->get('/recipes?category=Dinner');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.category', 'Dinner')
        ->where('filters.category', 'Dinner')
    );
});

test('the All category does not filter recipes', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(3)->create();

    $response = $this->actingAs($user)->get('/recipes?category=All');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->has('recipes.data', 3)
        ->where('filters.category', 'All')
    );
});

test('recipes can be sorted oldest first', function () {
    $user = User::factory()->create();
    $old = Recipe::factory()->create(['created_at' => now()->subDays(2)]);
    $new = Recipe::factory()->create(['created_at' => now()->subDay()]);

    $response = $this->actingAs($user)->get('/recipes?sort=oldest');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->where('recipes.data.0.id', $old->id)
        ->where('recipes.data.1.id', $new->id)
        ->where('filters.sort', 'oldest')
    );
});

test('recipes can be sorted alphabetically', function () {
    $user = User::factory()->create();
    Recipe::factory()->create(['title' => 'Zebra Cake']);
    Recipe::factory()->create(['title' => 'Apple Pie']);
    Recipe::factory()->create(['title' => 'Mango Tart']);

    $response = $this->actingAs($user)->get('/recipes?sort=az');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->where('recipes.data.0.title', 'Apple Pie')
        ->where('recipes.data.1.title', 'Mango Tart')
        ->where('recipes.data.2.title', 'Zebra Cake')
    );
});

test('recipes can be sorted reverse alphabetically', function () {
    $user = User::factory()->create();
    Recipe::factory()->create(['title' => 'Zebra Cake']);
    Recipe::factory()->create(['title' => 'Apple Pie']);
    Recipe::factory()->create(['title' => 'Mango Tart']);

    $response = $this->actingAs($user)->get('/recipes?sort=za');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->where('recipes.data.0.title', 'Zebra Cake')
        ->where('recipes.data.1.title', 'Mango Tart')
        ->where('recipes.data.2.title', 'Apple Pie')
    );
});

test('an unknown sort option falls back to newest', function () {
    $user = User::factory()->create();
    $old = Recipe::factory()->create(['created_at' => now()->subDay()]);
    $new = Recipe::factory()->create(['created_at' => now()]);

    $response = $this->actingAs($user)->get('/recipes?sort=bogus');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Recipes/Index')
        ->where('recipes.data.0.id', $new->id)
        ->where('recipes.data.1.id', $old->id)
        ->where('filters.sort', 'bogus')
    );
});
