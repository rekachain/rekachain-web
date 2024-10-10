<?php

use App\Models\User;

test('index method returns paginated feedback', function () {
    createFeedback();

    $response = actAsSuperAdmin()->getJson('/api/feedback?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {

    $response = actAsSuperAdmin()->get('/api/feedback/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Feedback/Create'));
});

test('store method creates new feedback', function () {
    $data = [
        'name' => 'Test name',
    ];

    $response = actAsSuperAdmin()->postJson('/api/feedback', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('feedback', $data);
});

test('show method returns feedback details', function () {
    $model = createFeedback();

    $response = actAsSuperAdmin()->getJson("/api/feedback/{$model->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $model->id, 'name' => $model->name]);
});

test('edit method returns edit page', function () {
    $model = createFeedback();

    $response = actAsSuperAdmin()->get("/api/feedback/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Feedback/Edit'));
});

test('update method updates feedback', function () {
    $model = createFeedback();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = actAsSuperAdmin()->putJson("/api/feedback/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('feedback', $updatedData);
});

test('destroy method deletes feedback', function () {
    $model = createFeedback();

    $response = actAsSuperAdmin()->deleteJson("/api/feedback/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('feedback', ['id' => $model->id]);
});