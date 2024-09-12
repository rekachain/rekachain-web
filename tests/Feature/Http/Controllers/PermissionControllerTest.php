<?php

use App\Models\User;
use App\Models\Permission;

test('index method returns paginated permissions', function () {
    $user = User::factory()->create();

    Permission::create(['name' => "user-create", 'guard_name' => 'web']);

    $response = $this->actingAs($user)->getJson('/permissions?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/permissions/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Permission/Create'));
});

test('store method creates new permission', function () {
    $user = User::factory()->create();
    $permissionData = [
        'name' => 'user-create',
        'guard_name' => 'web',
        'group' => 'User',
    ];

    $response = $this->actingAs($user)->postJson('/permissions', $permissionData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'guard_name']);
    $this->assertDatabaseHas('permissions', $permissionData);
});

test('show method returns permission details', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);

    $response = $this->actingAs($user)->getJson("/permissions/{$permission->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $permission->id,
            'name' => $permission->name,
            'guard_name' => $permission->guard_name,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);

    $response = $this->actingAs($user)->get("/permissions/{$permission->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Permission/Edit'));
});

test('update method is not yet implemented', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);
    $updatedData = [
        'name' => 'updated-permission',
    ];

    $response = $this->actingAs($user)->putJson("/permissions/{$permission->id}", $updatedData);

    $response->assertStatus(200)
        ->assertSee('This feature is not yet implemented.');
});

test('destroy method is not yet implemented', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);

    $response = $this->actingAs($user)->deleteJson("/permissions/{$permission->id}");

    $response->assertStatus(200)
        ->assertSee('This feature is not yet implemented.');
});
