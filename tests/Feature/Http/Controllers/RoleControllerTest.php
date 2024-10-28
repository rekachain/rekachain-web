<?php

use App\Models\Role;

test('can get all roles', function () {
    $this->dummy->createRole();
    $response = actAsSuperAdmin()->getJson('/roles?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('can get create role page', function () {
    actAsSuperAdmin()->get('/roles/create')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Role/Create')
            ->has('permissions')
            ->has('divisions')
        );
});

test('can store role', function () {
    $permission = $this->dummy->createPermission();
    $division = $this->dummy->createDivision();

    $roleData = [
        'name' => 'Test Role',
        'division_id' => $division->id,
        'level' => 'test level',
        'permissions' => [$permission->id],
    ];

    $response = actAsSuperAdmin()->postJson('/roles', $roleData);

    $response->assertStatus(201);
    $this->assertDatabaseHas('roles', [
        'name' => $roleData['name'],
        'division_id' => $roleData['division_id'],
        'level' => $roleData['level'],
    ]);
});

test('can show role', function () {
    $role = $this->dummy->createRole();
    actAsSuperAdmin()->getJson('/roles/' . $role->id)
        ->assertStatus(200)
        ->assertJsonStructure([
            'id', 'name', 'division_id', 'guard_name', 'level', 'users_count', 'permissions_count'
        ]);
});

test('can get edit role page', function () {
    $role = $this->dummy->createRole();
    actAsSuperAdmin()->get('/roles/' . $role->id . '/edit')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Role/Edit')
            ->has('role')
            ->has('permissions')
            ->has('divisions')
        );
});

test('can update role', function () {
    $role = $this->dummy->createRole();
    $permission = $this->dummy->createPermission();
    $division = $this->dummy->createDivision();

    $updatedData = [
        'name' => 'Updated Role Name',
        'division_id' => $division->id,
        'level' => 'updated level',
        'permissions' => [$permission->id],
    ];

    $response = actAsSuperAdmin()->putJson("/roles/{$role->id}", $updatedData);

    $response->assertStatus(200);
    $this->assertDatabaseHas('roles', [
        'id' => $role->id,
        'name' => $updatedData['name'],
        'division_id' => $updatedData['division_id'],
        'level' => $updatedData['level'],
    ]);
});

test('can destroy role', function () {
    $role = $this->dummy->createRole();
    actAsSuperAdmin()->deleteJson('/roles/' . $role->id)->assertStatus(200);
    $this->assertDatabaseMissing('roles', ['id' => $role->id]);
});
