<?php

use App\Models\Recipe;
use App\Models\User;

test('unverified users can still browse public pages', function () {
    $user = User::factory()->unverified()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)->get('/')->assertOk();
    $this->actingAs($user)->get('/about')->assertOk();
    $this->actingAs($user)->get(route('recipes.index'))->assertOk();
    $this->actingAs($user)->get(route('recipes.show', $recipe))->assertOk();
    $this->actingAs($user)->get(route('users.show', $recipe->user))->assertOk();
});

test('unverified users are redirected to the verification notice from gated pages', function () {
    $user = User::factory()->unverified()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)->get('/dashboard')->assertRedirect(route('verification.notice'));
    $this->actingAs($user)->get(route('recipes.create'))->assertRedirect(route('verification.notice'));
    $this->actingAs($user)->get(route('recipes.edit', $recipe))->assertRedirect(route('verification.notice'));
    $this->actingAs($user)->get(route('favorites.index'))->assertRedirect(route('verification.notice'));
    $this->actingAs($user)->get(route('profile.edit'))->assertRedirect(route('verification.notice'));
});

test('unverified users cannot perform write actions', function () {
    $user = User::factory()->unverified()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)
        ->post(route('recipes.store'), [])
        ->assertRedirect(route('verification.notice'));

    $this->actingAs($user)
        ->post(route('recipes.comments.store', $recipe), ['body' => 'Nice!'])
        ->assertRedirect(route('verification.notice'));

    $this->actingAs($user)
        ->post(route('recipes.rating.store', $recipe), ['rating' => 5])
        ->assertRedirect(route('verification.notice'));

    $this->actingAs($user)
        ->post(route('recipes.favorite', $recipe))
        ->assertRedirect(route('verification.notice'));

    $this->actingAs($user)
        ->patch(route('profile.update'), [])
        ->assertRedirect(route('verification.notice'));
});

test('verified users can access gated pages', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)->get('/dashboard')->assertOk();
    $this->actingAs($user)->get(route('recipes.create'))->assertOk();
    $this->actingAs($user)->get(route('recipes.edit', $recipe))->assertOk();
    $this->actingAs($user)->get(route('favorites.index'))->assertOk();
    $this->actingAs($user)->get(route('profile.edit'))->assertOk();
});

test('guests are redirected to login rather than the verification notice', function () {
    $this->get('/dashboard')->assertRedirect(route('login'));
    $this->get(route('recipes.create'))->assertRedirect(route('login'));
    $this->get(route('favorites.index'))->assertRedirect(route('login'));
});
