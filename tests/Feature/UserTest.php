<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Artisan::call('migrate:fresh');
    Artisan::call('db:seed', ['--class' => 'DivisionSeeder']);
    Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
    Artisan::call('db:seed', ['--class' => 'UserSeeder']);
});

function testAuthorization($context, User $user, $expectedStatus = 200) {
    $response = $context->actingAs($user)->get('/users/create');
    $response->assertStatus($expectedStatus);
    auth()->logout();
}

test('only Super Admin and authorized user can view create user form', function () {
    $superAdmin = User::find(1);
    $ppcPerencanaan = User::find(2);
    $ppcPengendalian = User::find(3);

    expect($superAdmin)->not->toBeNull();
    expect($ppcPerencanaan)->not->toBeNull();
    expect($ppcPengendalian)->not->toBeNull();

    testAuthorization($this, $superAdmin);

    testAuthorization($this, $ppcPerencanaan);

    testAuthorization($this, $ppcPengendalian, 403);
});

test('user can be created', function () {
    $ppcPerencanaan = \App\Models\User::find(2);

    $this->actingAs($ppcPerencanaan);

    $userData = [
        'nip' => '123456789012345680',
        'name' => 'New User',
        'email' => 'apiuser@example.com',
        'password' => 'password',
        'role_id' => 3, // Role ID for PPC Pengendalian
    ];

    $response = $this->postJson('/api/users', $userData);

    $response->assertStatus(201) // Assuming 201 for created
        ->assertJson([
            'email' => 'apiuser@example.com',
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'apiuser@example.com',
    ]);
});

test('user can be viewed', function () {
    $ppcPerencanaan = \App\Models\User::find(2);

    $this->actingAs($ppcPerencanaan);

    $user = User::find(3);

    $response = $this->getJson('/api/users/' . $user->id);

    $response->assertStatus(200)
        ->assertJson([
            'email' => $user->email,
        ]);
});

test('user can be updated', function () {
    $ppcPerencanaan = User::find(2);

    $this->actingAs($ppcPerencanaan);

    $user = User::find(3);

    $userData = [
        'name' => 'Updated User',
    ];

    $response = $this->putJson('/api/users/' . $user->id, $userData);

    $response->assertStatus(200)
        ->assertJson([
            'name' => 'Updated User',
        ]);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated User',
    ]);
});

test('user can be updated with providing image', function () {

    $ppcPerencanaan = User::find(2);

    $this->actingAs($ppcPerencanaan);

    $user = User::find(3);

    $userData = [
        'name' => 'Updated User',
        'image_path' => UploadedFile::fake()->image('avatar.jpg'),
    ];

    $response = $this->putJson('/api/users/' . $user->id, $userData);

    $response->assertStatus(200)
        ->assertJson([
            'name' => 'Updated User',
        ]);

    Storage::disk('public')->assertExists($user->image_path);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated User',
    ]);
});

test('user can be deleted', function () {
    $ppcPerencanaan = \App\Models\User::find(2);

    $this->actingAs($ppcPerencanaan);

    $user = User::find(3);

    $response = $this->deleteJson('/api/users/' . $user->id);

    $response->assertStatus(200);

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});
