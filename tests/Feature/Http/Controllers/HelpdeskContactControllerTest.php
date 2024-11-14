<?php

use App\Models\User;

test('index method returns paginated helpdesk-contacts', function () {
    createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson('/helpdesk-contacts?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {

    $response = actAsSuperAdmin()->get('/helpdesk-contacts/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Create'));
});

test('store method creates new HelpdeskContact', function () {
    $data = [
        'name' => 'Test name',
    ];

    $response = actAsSuperAdmin()->postJson('/helpdesk-contacts', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('helpdesk-contacts', $data);
});

test('show method returns HelpdeskContact details', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson("/helpdesk-contacts/{$model->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $model->id, 'name' => $model->name]);
});

test('edit method returns edit page', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->get("/helpdesk-contacts/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Edit'));
});

test('update method updates HelpdeskContact', function () {
    $model = createHelpdeskContact();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = actAsSuperAdmin()->putJson("/helpdesk-contacts/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('helpdesk-contacts', $updatedData);
});

test('destroy method deletes HelpdeskContact', function () {
    $model = createHelpdeskContact();

    $response = actAsSuperAdmin()->deleteJson("/helpdesk-contacts/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('helpdesk-contacts', ['id' => $model->id]);
});