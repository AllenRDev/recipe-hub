<?php

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('a recipe belongs to a user', function () {
    $recipe = Recipe::factory()->create();

    expect($recipe->user)->toBeInstanceOf(User::class)
        ->and($recipe->user->id)->toBe($recipe->user_id);
});

test('a recipe has many comments', function () {
    $recipe = Recipe::factory()->create();
    Comment::factory()->count(2)->create(['recipe_id' => $recipe->id]);

    expect($recipe->comments)->toHaveCount(2)
        ->and($recipe->comments->first())->toBeInstanceOf(Comment::class);
});

test('a recipe has many ratings', function () {
    $recipe = Recipe::factory()->create();
    Rating::factory()->count(3)->create(['recipe_id' => $recipe->id]);

    expect($recipe->ratings)->toHaveCount(3)
        ->and($recipe->ratings->first())->toBeInstanceOf(Rating::class);
});

test('a recipe can be favorited by many users', function () {
    $recipe = Recipe::factory()->create();
    $users = User::factory()->count(2)->create();

    $recipe->favoritedBy()->attach($users->pluck('id'));

    expect($recipe->favoritedBy)->toHaveCount(2)
        ->and($recipe->favoritedBy->first())->toBeInstanceOf(User::class);
});

test('ingredients and instructions are cast to arrays', function () {
    $recipe = Recipe::factory()->create([
        'ingredients' => [['amount' => '1', 'name' => 'Flour']],
        'instructions' => [['step' => 'Mix.']],
    ]);

    $fresh = $recipe->fresh();

    expect($fresh->ingredients)->toBeArray()
        ->and($fresh->ingredients[0]['name'])->toBe('Flour')
        ->and($fresh->instructions)->toBeArray()
        ->and($fresh->instructions[0]['step'])->toBe('Mix.');
});

test('averageRating returns zero when there are no ratings', function () {
    $recipe = Recipe::factory()->create();

    expect($recipe->averageRating())->toBe(0.0);
});

test('averageRating rounds to one decimal place', function () {
    $recipe = Recipe::factory()->create();

    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 4]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 5]);
    Rating::factory()->create(['recipe_id' => $recipe->id, 'rating' => 4]);

    expect($recipe->averageRating())->toBe(4.3);
});

test('ratingCount returns the number of ratings', function () {
    $recipe = Recipe::factory()->create();
    Rating::factory()->count(3)->create(['recipe_id' => $recipe->id]);

    expect($recipe->ratingCount())->toBe(3);
});

test('ratingCount returns zero when there are no ratings', function () {
    $recipe = Recipe::factory()->create();

    expect($recipe->ratingCount())->toBe(0);
});
