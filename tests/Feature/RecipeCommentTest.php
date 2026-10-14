<?php

use App\Models\Comment;
use App\Models\Recipe;
use App\Models\User;

test('guests cannot comment on a recipe', function () {
    $recipe = Recipe::factory()->create();

    $this->post(route('recipes.comments.store', $recipe), ['body' => 'Hello'])
        ->assertRedirect(route('login'));

    $this->assertDatabaseCount('comments', 0);
});

test('authenticated users can comment on a recipe', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('recipes.show', $recipe))
        ->post(route('recipes.comments.store', $recipe), ['body' => 'Looks tasty!']);

    $response->assertRedirect(route('recipes.show', $recipe));

    $this->assertDatabaseHas('comments', [
        'user_id' => $user->id,
        'recipe_id' => $recipe->id,
        'body' => 'Looks tasty!',
    ]);
});

test('a comment body is required', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)
        ->post(route('recipes.comments.store', $recipe), ['body' => ''])
        ->assertSessionHasErrors('body');
});

test('a comment body may not exceed one thousand characters', function () {
    $user = User::factory()->create();
    $recipe = Recipe::factory()->create();

    $this->actingAs($user)
        ->post(route('recipes.comments.store', $recipe), ['body' => str_repeat('a', 1001)])
        ->assertSessionHasErrors('body');
});

test('the author can delete their comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)
        ->from(route('recipes.show', $comment->recipe_id))
        ->delete(route('comments.destroy', $comment));

    $response
        ->assertRedirect(route('recipes.show', $comment->recipe_id))
        ->assertSessionHas('success', 'Comment deleted!');

    expect(Comment::find($comment->id))->toBeNull();
});

test('a user cannot delete another users comment', function () {
    $comment = Comment::factory()->create();
    $other = User::factory()->create();

    $this->actingAs($other)
        ->delete(route('comments.destroy', $comment))
        ->assertForbidden();

    expect(Comment::find($comment->id))->not->toBeNull();
});

test('guests cannot delete comments', function () {
    $comment = Comment::factory()->create();

    $this->delete(route('comments.destroy', $comment))->assertRedirect(route('login'));

    expect(Comment::find($comment->id))->not->toBeNull();
});
