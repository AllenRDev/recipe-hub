<?php

use App\Models\Recipe;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('anyone can view a user profile', function () {
    $user = User::factory()->create();

    $response = $this->get(route('users.show', $user));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Users/Show')
        ->where('user.id', $user->id)
    );
});

test('a user profile lists only that users recipes', function () {
    $user = User::factory()->create();
    $other = User::factory()->create();

    $mine = Recipe::factory()->create(['user_id' => $user->id]);
    Recipe::factory()->create(['user_id' => $other->id]);

    $response = $this->get(route('users.show', $user));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Users/Show')
        ->has('recipes.data', 1)
        ->where('recipes.data.0.id', $mine->id)
        ->where('recipes.total', 1)
    );
});

test('a user profile paginates recipes six at a time', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(7)->create(['user_id' => $user->id]);

    $response = $this->get(route('users.show', $user));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Users/Show')
        ->has('recipes.data', 6)
        ->where('recipes.total', 7)
    );
});

test('viewing a missing user profile returns a 404', function () {
    $this->get('/users/999999')->assertNotFound();
});
