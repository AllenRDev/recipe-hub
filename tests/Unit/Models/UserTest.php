<?php

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('a user has many recipes', function () {
    $user = User::factory()->create();
    Recipe::factory()->count(2)->create(['user_id' => $user->id]);

    expect($user->recipes)->toHaveCount(2)
        ->and($user->recipes->first())->toBeInstanceOf(Recipe::class);
});

test('a user has many comments', function () {
    $user = User::factory()->create();
    Comment::factory()->count(2)->create(['user_id' => $user->id]);

    expect($user->comments)->toHaveCount(2)
        ->and($user->comments->first())->toBeInstanceOf(Comment::class);
});

test('a user has many ratings', function () {
    $user = User::factory()->create();
    Rating::factory()->count(2)->create(['user_id' => $user->id]);

    expect($user->ratings)->toHaveCount(2)
        ->and($user->ratings->first())->toBeInstanceOf(Rating::class);
});

test('a user has many favorite recipes', function () {
    $user = User::factory()->create();
    $recipes = Recipe::factory()->count(2)->create();

    $user->favoriteRecipes()->attach($recipes->pluck('id'));

    expect($user->favoriteRecipes)->toHaveCount(2)
        ->and($user->favoriteRecipes->first())->toBeInstanceOf(Recipe::class);
});

test('the profile url is null when no image is set', function () {
    $user = User::factory()->create(['profile_image' => null]);

    expect($user->profile_url)->toBeNull();
});

test('the profile url points to the public storage disk', function () {
    $user = User::factory()->create(['profile_image' => 'profile_photos/avatar.png']);

    expect($user->profile_url)->toEndWith('/storage/profile_photos/avatar.png')
        ->and($user->profile_url)->toStartWith('http');
});

test('a user implements the must verify email contract', function () {
    expect(User::factory()->create())
        ->toBeInstanceOf(MustVerifyEmail::class);
});

test('the password is hashed when set', function () {
    $user = User::factory()->create(['password' => 'plain-text']);

    expect($user->password)->not->toBe('plain-text');
    expect(password_verify('plain-text', $user->password))->toBeTrue();
});
