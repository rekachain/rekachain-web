<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('profile edit page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/profile');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Profile/Edit')
            ->has('mustVerifyEmail')
            ->has('status')
        );
});

test('profile information can be updated', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect('/profile');
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);
});

test('profile image can be updated', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $file = UploadedFile::fake()->image('avatar.jpg');

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'image_path' => $file,
    ]);

    $response->assertRedirect('/profile');
    Storage::disk('public')->assertExists('users/images/' . $file->hashName());
});

test('user can delete their account', function () {
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);

    $response = $this->actingAs($user)->delete('/profile', [
        'password' => 'password',
    ]);

    $response->assertRedirect('/');
    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});
