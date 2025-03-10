<?php

use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of product-problems', function () {
    $this->dummy->createProductProblem();

    $response = actAsWorkerAftersales()->getJson('/product-problems?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.returned_product_id')
                ->has('data.0.component_id')
                ->has('data.0.status')
                ->etc();
        });
});

test('user can view a create form of product-problem', function () {

    $response = actAsWorkerAftersales()->get('/product-problems/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductProblem/Create'));
});

test('system can save created product-problem to database', function () {
    $data = [
        'returned_product_id' => 1,
        'component_id' => 1,
        'status' => 'draft',
    ];

    $response = actAsWorkerAftersales()->postJson('/product-problems', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'returned_product_id', 'component_id', 'status']);
    $this->assertDatabaseHas('product_problems', $data);
});

test('user can view ProductProblem details', function () {
    $model = $this->dummy->createProductProblem();

    $response = actAsWorkerAftersales()->getJson("/product-problems/{$model->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $model->id, 
            'returned_product_id' => $model->returned_product_id, 
            'returned_product' => $model->returned_product->toArray(), 
            'component_id' => $model->component_id, 
            'component' => $model->component->toArray(), 
            'status' => $model->status->value,
        ]);
});

test('user can view ProductProblem edit page', function () {
    $model = $this->dummy->createProductProblem();

    $response = actAsWorkerAftersales()->get("/product-problems/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductProblem/Edit'));
});

test('system can update updated ProductProblem in database', function () {
    $model = $this->dummy->createProductProblem();
    $updatedData = [
        'status' => 'fixed',
    ];

    $response = actAsWorkerAftersales()->putJson("/product-problems/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('product_problems', $updatedData);
});