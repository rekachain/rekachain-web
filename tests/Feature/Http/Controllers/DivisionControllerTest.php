<?php

use App\Models\User;

test('index method returns paginated divisions', function () {
    $user = User::factory()->superAdmin()->create();
    $this->dummy->createDivision();

    $response = $this->actingAs($user)->getJson('/divisions?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/divisions/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Division/Create'));
});

test('store method creates new division', function () {
    $user = User::factory()->superAdmin()->create();
    $divisionData = [
        'name' => 'Test name',
    ];

    $response = $this->actingAs($user)->postJson('/divisions', $divisionData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('divisions', $divisionData);
});

test('show method returns division details', function () {
    $user = User::factory()->superAdmin()->create();
    $division = $this->dummy->createDivision();

    $response = $this->actingAs($user)->getJson("/divisions/{$division->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $division->id, 'name' => $division->name]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $division = $this->dummy->createDivision();

    $response = $this->actingAs($user)->get("/divisions/{$division->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Division/Edit'));
});

test('update method updates division', function () {
    $user = User::factory()->superAdmin()->create();
    $division = $this->dummy->createDivision();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = $this->actingAs($user)->putJson("/divisions/{$division->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('divisions', $updatedData);
});

test('destroy method deletes division', function () {
    $user = User::factory()->superAdmin()->create();
    $division = $this->dummy->createDivision('create');

    $response = $this->actingAs($user)->deleteJson("/divisions/{$division->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('divisions', ['id' => $division->id]);
});
