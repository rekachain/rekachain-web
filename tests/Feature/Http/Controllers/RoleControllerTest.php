<?php

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;

test('can get get all role', function () {
    Role::factory()->count(5)->create();
    $response = actAsSuperAdmin()->getJson('/roles?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

test('can get create role', function () {
    actAsSuperAdmin()->get('/roles/create')->assertStatus(200);
});

// test('can store role', function () {
//     $permission = new Permission();
//     $permission->name = 'test';
//     $permission->guard_name = 'test guard name';
//     $permission->save();
//     $roleData = [
//         'name' => 'test',
//         'guard_name' => 'test guard name',
//         'level' => 'test level',
//         'permissions' => [1],
//     ];

//     $response = actAsSuperAdmin()->post('/roles', $roleData);

//     $response->assertStatus(200);
//     $this->assertDatabaseHas('roles', [
//         'name' => $roleData['name'],
//     ]);
// });

test('can get show role', function () {
    $role = Role::factory()->create();
    actAsSuperAdmin()->get('/roles/' . $role->id)->assertStatus(200);
});

test('can get edit role', function () {
    $role = Role::factory()->create();
    actAsSuperAdmin()->get('/roles/' . $role->id . '/edit')->assertStatus(200);
});

// test('can update role', function () {
//     $user = User::factory()->create();
//     $role = Role::factory()->create();
//     $updatedData = [
//         'name' => 'awoekaowkeoakew',
//         'guard_name' => $role->guard_name,
//         'level' => $role->level,
//         'permissions' => $role->permissions,
//     ];
//     $response = $this->actingAs($user)->putJson("/roles/{$role->id}", $updatedData)->assertStatus(200);

//     $this->assertDatabaseHas('roles', [
//         'id' => $role->id,
//         'name' => $updatedData['name'],
//     ]);
// });

test('can destroy role', function () {
    $role = Role::factory()->create();
    actAsSuperAdmin()->delete('/roles/' . $role->id)->assertStatus(200);
});
