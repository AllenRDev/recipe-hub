<?php

use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to login from the dashboard', function () {
    $this->get('/dashboard')->assertRedirect(route('login'));
});

test('authenticated users can view the dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->where('user.id', $user->id)
        ->has('recipes.data')
    );
});

test('the dashboard only lists recipes belonging to the authenticated user', function () {
    $user = User::factory()->create();
    $other = User::factory()->create();

    $mine = Recipe::factory()->create(['user_id' => $user->id]);
    Recipe::factory()->create(['user_id' => $other->id]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.id', $mine->id)
        ->where('recipes.total', 1)
    );
});

test('the dashboard paginates recipes six at a time', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(7)->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('recipes.data', 6)
        ->where('recipes.total', 7)
        ->where('recipes.per_page', 6)
    );
});
