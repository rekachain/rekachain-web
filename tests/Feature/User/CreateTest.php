<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate:fresh');
    Artisan::call('db:seed', ['--class' => 'DivisionSeeder']);
    Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
    Artisan::call('db:seed', ['--class' => 'UserSeeder']);
});

test('only authorized user can view create user form', function () {
    // might create test service interface
    $ppcPerencanaan = User::find(2);
    $ppcPengendalian = User::find(3);

    expect($ppcPerencanaan)->not->toBeNull();
    expect($ppcPengendalian)->not->toBeNull();

    $this->actingAs($ppcPerencanaan);

    $response = $this->get('/users/create');
    $response->assertStatus(200);

    auth()->logout();
    $this->actingAs($ppcPengendalian);

    $response = $this->get('/users/create');
    $response->assertStatus(403);
});

test('user can be created through API', function () {
    $ppcPerencanaan = \App\Models\User::find(2);

    $this->actingAs($ppcPerencanaan);

    $userData = [
        'nip' => '123456789012345680',
        'name' => 'New API User',
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
