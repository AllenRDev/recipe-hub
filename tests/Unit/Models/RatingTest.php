<?php

use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('a rating belongs to a recipe', function () {
    $rating = Rating::factory()->create();

    expect($rating->recipe)->toBeInstanceOf(Recipe::class)
        ->and($rating->recipe->id)->toBe($rating->recipe_id);
});

test('a rating belongs to a user', function () {
    $rating = Rating::factory()->create();

    expect($rating->user)->toBeInstanceOf(User::class)
        ->and($rating->user->id)->toBe($rating->user_id);
});
