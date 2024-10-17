<?php

use App\Support\Enums\FeedbackStatusEnum;

test('index method returns paginated feedback', function () {
    $this->dummy->createFeedback();

    $response = actAsSuperAdmin()->getJson('/feedback?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//
//    $response = actAsSuperAdmin()->get('/feedback/create');
//
//    $response->assertStatus(200)
//        ->assertInertia(fn ($assert) => $assert->component('Feedback/Create'));
// });

test('store method creates new Feedback', function () {
    $data = [
        'name' => 'Test name',
        'email' => 'test@example.com',
        'message' => 'Test message',
        'rating' => 5,
    ];

    $response = actAsSuperAdmin()->postJson('/feedback', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'email', 'message', 'rating', 'status']);
    $this->assertDatabaseHas('feedback', $data);
});

test('show method returns Feedback details', function () {
    $model = $this->dummy->createFeedback();

    $response = actAsSuperAdmin()->getJson("/feedback/{$model->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $model->id,
            'name' => $model->name,
            'email' => $model->email,
            'message' => $model->message,
            'rating' => $model->rating,
            'status' => FeedbackStatusEnum::PENDING->value,
        ]);
});

test('edit method returns edit page', function () {
    $model = $this->dummy->createFeedback();

    $response = actAsSuperAdmin()->get("/feedback/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Feedback/Edit'));
});

// test('update method updates Feedback', function () {
//    $model = $this->dummy->createFeedback();
//    $updatedData = [
//        'name' => 'Updated name',
//    ];
//
//    $response = actAsSuperAdmin()->putJson("/feedback/{$model->id}", $updatedData);
//
//    $response->assertStatus(200)
//        ->assertJson($updatedData);
//    $this->assertDatabaseHas('feedback', $updatedData);
// });

test('destroy method deletes Feedback', function () {
    $model = $this->dummy->createFeedback();

    $response = actAsSuperAdmin()->deleteJson("/feedback/{$model->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('feedback', ['id' => $model->id]);
});
