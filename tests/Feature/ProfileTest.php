<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('profile page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/profile');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('Profile/Edit'));
});

test('profile information can be updated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch('/profile', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    $user->refresh();

    $this->assertSame('Test User', $user->name);
    $this->assertSame('test@example.com', $user->email);
    $this->assertNull($user->email_verified_at);
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch('/profile', [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    $this->assertNotNull($user->refresh()->email_verified_at);
});

test('user can delete their account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete('/profile', [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    $this->assertGuest();
    $this->assertNull($user->fresh());
});

test('deleting the account removes the profile image from storage', function () {
    Storage::fake('public');
    Storage::disk('public')->put('profile_photos/avatar.png', 'avatar');

    $user = User::factory()->create([
        'profile_image' => 'profile_photos/avatar.png',
    ]);

    $this->actingAs($user)->delete('/profile', ['password' => 'password']);

    Storage::disk('public')->assertMissing('profile_photos/avatar.png');
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->delete('/profile', [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect('/profile');

    $this->assertNotNull($user->fresh());
});

test('a bio can be added to the profile', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'bio' => 'I love cooking Italian food.',
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/profile');

    expect($user->refresh()->bio)->toBe('I love cooking Italian food.');
});

test('a profile image can be uploaded and the old one removed', function () {
    Storage::fake('public');
    Storage::disk('public')->put('profile_photos/old.png', 'old');

    $user = User::factory()->create(['profile_image' => 'profile_photos/old.png']);

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'profile_image' => fakeImage('avatar.png'),
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/profile');

    $user->refresh();

    expect($user->profile_image)->toStartWith('profile_photos/');
    expect($user->profile_image)->not->toBe('profile_photos/old.png');

    Storage::disk('public')->assertMissing('profile_photos/old.png');
    Storage::disk('public')->assertExists($user->profile_image);
});

test('a profile image can be uploaded when none existed before', function () {
    Storage::fake('public');

    $user = User::factory()->create(['profile_image' => null]);

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'profile_image' => fakeImage('first-avatar.png'),
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/profile');

    $user->refresh();

    expect($user->profile_image)->toStartWith('profile_photos/');
    Storage::disk('public')->assertExists($user->profile_image);
});

test('the profile image must be a valid image', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $response = $this->actingAs($user)->from('/profile')->patch('/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'profile_image' => UploadedFile::fake()->create('document.txt', 1, 'text/plain'),
    ]);

    $response->assertSessionHasErrors('profile_image')->assertRedirect('/profile');

    expect($user->refresh()->profile_image)->toBeNull();
});

test('the email must be unique when updating the profile', function () {
    $user = User::factory()->create();
    $other = User::factory()->create();

    $response = $this->actingAs($user)->from('/profile')->patch('/profile', [
        'name' => $user->name,
        'email' => $other->email,
    ]);

    $response->assertSessionHasErrors('email');

    expect($user->refresh()->email)->not->toBe($other->email);
});
