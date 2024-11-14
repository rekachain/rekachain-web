<?php

use App\Models\User;

test('index method returns paginated helpdeskContacts', function () {
    createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson('/api/helpdeskContacts?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {

    $response = actAsSuperAdmin()->get('/api/helpdeskContacts/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Create'));
});

test('store method creates new helpdeskContact', function () {
    $data = [
        'name' => 'Test name',
    ];

    $response = actAsSuperAdmin()->postJson('/api/helpdeskContacts', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('helpdeskContacts', $data);
});

test('show method returns helpdeskContact details', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson("/api/helpdeskContacts/{$model->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $model->id, 'name' => $model->name]);
});

test('edit method returns edit page', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->get("/api/helpdeskContacts/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Edit'));
});

test('update method updates helpdeskContact', function () {
    $model = createHelpdeskContact();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = actAsSuperAdmin()->putJson("/api/helpdeskContacts/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('helpdeskContacts', $updatedData);
});

test('destroy method deletes helpdeskContact', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->deleteJson("/api/helpdeskContacts/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('helpdeskContacts', ['id' => $model->id]);
});