<?php

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can view the landing page', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->where('canLogin', true)
        ->where('canRegister', true)
        ->has('featuredRecipes', 0)
    );
});

test('the landing page shows the three most recent recipes', function () {
    $user = User::factory()->create();

    $recipes = [];
    foreach (range(1, 5) as $minutes) {
        $recipes[$minutes] = Recipe::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subMinutes($minutes),
        ]);
    }

    $response = $this->get('/');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->has('featuredRecipes', 3)
        ->where('featuredRecipes.0.id', $recipes[1]->id)
        ->where('featuredRecipes.1.id', $recipes[2]->id)
        ->where('featuredRecipes.2.id', $recipes[3]->id)
        ->has('featuredRecipes.0.user')
    );
});

test('featured recipes include comment counts and average ratings', function () {
    $recipe = Recipe::factory()->create();

    Comment::factory()->count(2)->create(['recipe_id' => $recipe->id]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 4]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 5]);

    $response = $this->get('/');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->where('featuredRecipes.0.comments_count', 2)
        ->where('featuredRecipes.0.ratings_avg_rating', fn ($value) => round((float) $value, 1) === 4.5)
    );
});

test('the about page can be viewed', function () {
    $response = $this->get('/about');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('About'));
});

test('inertia shares the authenticated user with every page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/about');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('About')
        ->where('auth.user.id', $user->id)
    );
});

test('authenticated users can view the landing page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('Home'));
});
