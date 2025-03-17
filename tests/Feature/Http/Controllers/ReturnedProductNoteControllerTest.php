<?php

use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of returned-product-notes', function () {
    $this->dummy->createReturnedProductNote();

    $response = actAsWorkerAftersales()->getJson('/returned-product-notes?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.returned_product_id')
                ->has('data.0.note')
                ->has('data.0.user_id')
                ->has('data.0.created_at')
                ->etc();
        });
});

test('user can view a create form of returned-product-note', function () {

    $response = actAsWorkerAftersales()->get('/returned-product-notes/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReturnedProductNote/Create'));
});

test('system can save created returned-product-note to database', function () {
    $data = [
        'note' => 'Test note',
    ];

    $response = actAsWorkerAftersales()->postJson('/returned-product-notes', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'returned_product_id', 'note', 'user_id', 'created_at', 'updated_at']);
    $this->assertDatabaseHas('returned_product_notes', $data);
});

test('user can view ReturnedProductNote details', function () {
    $model = $this->dummy->createReturnedProductNote();

    $response = actAsWorkerAftersales()->getJson("/returned-product-notes/{$model->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $model->id, 
            'returned_product_id' => $model->returned_product_id, 
            'note' => $model->note, 
            'user_id' => $model->user_id, 
            'user' => $model->user->toArray(), 
        ]);
});

test('user can view returned-product-note edit page', function () {
    $model = $this->dummy->createReturnedProductNote();

    $response = actAsWorkerAftersales()->get("/returned-product-notes/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReturnedProductNote/Edit'));
});

test('system can update updated ReturnedProductNote in database', function () {
    $model = $this->dummy->createReturnedProductNote();
    $updatedData = [
        'note' => 'Updated test note',
    ];

    $response = actAsWorkerAftersales()->putJson("/returned-product-notes/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('returned_product_notes', $updatedData);
});

test('system can delete returned-product-note from database', function () {
    $model = $this->dummy->createReturnedProductNote();

    $response = actAsWorkerAftersales()->deleteJson("/returned-product-notes/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('returned_product_notes', ['id' => $model->id]);
});