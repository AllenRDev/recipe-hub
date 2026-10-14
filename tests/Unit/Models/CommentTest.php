<?php

use App\Models\Comment;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('a comment belongs to a recipe', function () {
    $comment = Comment::factory()->create();

    expect($comment->recipe)->toBeInstanceOf(Recipe::class)
        ->and($comment->recipe->id)->toBe($comment->recipe_id);
});

test('a comment belongs to a user', function () {
    $comment = Comment::factory()->create();

    expect($comment->user)->toBeInstanceOf(User::class)
        ->and($comment->user->id)->toBe($comment->user_id);
});
