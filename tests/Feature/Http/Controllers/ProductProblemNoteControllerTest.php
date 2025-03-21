<?php

use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of product-problem-notes', function () {
    $this->dummy->createProductProblemNote();

    $response = actAsWorkerAftersales()->getJson('/product-problem-notes?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.product_problem_id')
                ->has('data.0.note')
                ->has('data.0.user_id')
                ->has('data.0.created_at')
                ->etc();
        });
});

test('user can view a create form of product-problem-note', function () {

    $response = actAsWorkerAftersales()->get('/product-problem-notes/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductProblemNote/Create'));
});

test('system can save created product-problem-note to database', function () {
    $model = $this->dummy->createProductProblem();
    $data = [
        'product_problem_id' => $model->id,
        'note' => 'Test note',
    ];

    $response = actAsWorkerAftersales()->postJson('/product-problem-notes', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'product_problem_id', 'note', 'user_id', 'created_at', 'updated_at']);
    $this->assertDatabaseHas('product_problem_notes', $data);
});

test('user can view ProductProblemNote details', function () {
    $model = $this->dummy->createProductProblemNote();

    $response = actAsWorkerAftersales()->getJson("/product-problem-notes/{$model->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $model->id, 
            'product_problem_id' => $model->product_problem_id, 
            'note' => $model->note, 
            'user_id' => $model->user_id, 
            'user' => $model->user->toArray(), 
        ]);
});

test('user can view product-problem-note edit page', function () {
    $model = $this->dummy->createProductProblemNote();

    $response = actAsWorkerAftersales()->get("/product-problem-notes/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductProblemNote/Edit'));
});

test('system can update ProductProblemNote', function () {
    $model = $this->dummy->createProductProblemNote();
    $updatedData = [
        'note' => 'Updated note',
    ];

    $response = actAsWorkerAftersales()->putJson("/product-problem-notes/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('product_problem_notes', $updatedData);
});

test('system can delete ProductProblemNote', function () {
    $model = $this->dummy->createProductProblemNote();

    $response = actAsWorkerAftersales()->deleteJson("/product-problem-notes/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('product_problem_notes', ['id' => $model->id]);
});