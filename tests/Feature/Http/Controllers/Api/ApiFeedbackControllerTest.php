<?php

use App\Support\Enums\FeedbackStatusEnum;

test('index method returns paginated feedback', function () {
    createFeedback();

    $response = actAsSuperAdmin()->getJson('/api/feedback?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('store method creates new feedback', function () {
    $data = [
        'name' => 'Test name',
        'email' => 'test@example.com',
        'message' => 'Test message',
        'rating' => 5,
    ];

    $response = actAsSuperAdmin()->postJson('/api/feedback', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'email', 'message', 'rating', 'status']);
    $this->assertDatabaseHas('feedback', $data);
});

test('show method returns Feedback details', function () {
    $model = createFeedback();

    $response = actAsSuperAdmin()->getJson("/api/feedback/{$model->id}");

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

// test('update method updates feedback', function () {
//    $model = createFeedback();
//    $updatedData = [
//        'name' => 'Updated name',
//    ];
//
//    $response = actAsSuperAdmin()->putJson("/api/feedback/{$model->id}", $updatedData);
//
//    $response->assertStatus(200)
//        ->assertJson($updatedData);
//    $this->assertDatabaseHas('feedback', $updatedData);
// });

test('destroy method deletes feedback', function () {
    $model = createFeedback();

    $response = actAsSuperAdmin()->deleteJson("/api/feedback/{$model->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('feedback', ['id' => $model->id]);
});