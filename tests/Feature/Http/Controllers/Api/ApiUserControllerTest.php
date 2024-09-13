<?php

use App\Models\Role;
use App\Models\User;

test('view all users', function () {
    $user = User::factory()->create();
    actAsSuperAdmin()->get('/api/users')->assertStatus(200);
});

test('show one user', function () {
    $user = User::factory()->create();
    actAsSuperAdmin()->get('/api/users/' . $user->id)->assertStatus(200);
});

test('store one user', function () {
    $role = Role::firstOrCreate(['name' => 'Super Admin']);
    actAsSuperAdmin()->post('/api/users', [
        'name' => 'user test',
        'nip' => '123456789012345678',
        'email' => 'usertest@ex.com',
        'password' => 'password',
        'role_id' => $role->id,
    ])->assertStatus(201);

    $this->assertDatabaseHas('users', [
        'name' => 'user test',
        'nip' => '123456789012345678',
    ]);
});

test('update one user', function () {
    $user = User::factory()->create();
    actAsSuperAdmin()->put('/api/users/' . $user->id, [
        'name' => 'user test updated',
    ])->assertStatus(200);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'user test updated',
    ]);
});

test('destroy one user', function () {
    $user = User::factory()->create();
    actAsSuperAdmin()->delete('/api/users/' . $user->id)->assertStatus(200);

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});
