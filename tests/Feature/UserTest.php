<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function testAuthorization($context, User $user, $expectedStatus = 200) {
    $response = $context->actingAs($user)->get('/users/create');
    $response->assertStatus($expectedStatus);
    auth()->logout();
}

test('only Super Admin and authorized user can view create user form', function () {
    $superAdmin = User::factory()->superAdmin()->create();
    $ppcPerencanaan = User::factory()->ppcPerencanaan()->create();
    $ppcPengendalian = User::factory()->ppcPengendalian()->create();

    expect($superAdmin)->not->toBeNull()
        ->and($ppcPerencanaan)->not->toBeNull()
        ->and($ppcPengendalian)->not->toBeNull();

    testAuthorization($this, $superAdmin);

    testAuthorization($this, $ppcPerencanaan);

    testAuthorization($this, $ppcPengendalian, 403);
});

test('user can be created', function () {
    actAsSuperAdmin();

    $userData = [
        'nip' => '123456789012345680',
        'name' => 'New User',
        'email' => 'apiuser@example.com',
        'password' => 'password',
        'role_id' => Role::whereName('Super Admin')->first()->id, // Role ID for Super Admin
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
    actAsPpcPerencanaan();

    $user = User::factory()->create();

    $response = $this->getJson('/api/users/' . $user->id);

    $response->assertStatus(200)
        ->assertJson([
            'email' => $user->email,
        ]);
});

test('user can be updated', function () {
    actAsPpcPerencanaan();

    $user = User::factory()->create();

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
    actAsPpcPerencanaan();

    $user = User::factory()->create();

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
    actAsPpcPerencanaan();

    $user = User::factory()->create();

    $response = $this->deleteJson('/api/users/' . $user->id);

    $response->assertStatus(200);

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});
