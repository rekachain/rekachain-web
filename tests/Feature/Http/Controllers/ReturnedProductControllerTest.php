<?php

use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of returned-products', function () {
    $response = actAsAftersales()->getJson('/returned-products?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.product_return.name')
                ->has('data.0.buyer.name')
                ->has('data.0.qty')
                ->has('data.0.serial_number')
                ->etc();
        });;
});

test('user can view a create form of returned-product', function () {

    $response = actAsAftersales()->get('/returned-products/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReturnedProduct/Create'));
});

test('system can save created returned-product to database', function () {
    $data = [
        'product_returnable_id' => '1',
        'product_returnable_model' => 'App\Models\Panel',
        'buyer_id' => '1',
        'qty' => '1',
    ];

    $response = actAsAftersales()->postJson('/returned-products', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'product_returnable_id', 'product_returnable_model', 'product_return', 'buyer_id', 'buyer', 'qty', 'serial_number']);
    $this->assertDatabaseHas('returned-products', $data);
});

test('buyer can view return request of ordered product form', function () {
    $response = actAsBuyer()->get('/returned-products/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReturnedProduct/Create'));
});

test('user can view ReturnedProduct details', function () {
    $model = $this->dummy->createReturnedProduct();

    $response = actAsAftersales()->getJson("/returned-products/{$model->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $model->id, 
            'product_returnable_id' => $model->product_returnable_id, 
            'product_returnable_model' => $model->product_returnable_model, 
            'product_return' => $model->product_return, 
            'buyer_id' => $model->buyer_id, 
            'buyer' => $model->buyer, 
            'qty' => $model->qty, 
            'serial_number' => $model->serial_number ? $model->serial_number : '0',
        ]);
});

test('user can view returned-product edit page', function () {
    $model = $this->dummy->createReturnedProduct();

    $response = actAsAftersales()->get("/returned-products/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReturnedProduct/Edit'));
});

test('system can update updated ReturnedProduct in database', function () {
    $model = $this->dummy->createReturnedProduct();
    $updatedData = [
        'qty' => '2',
    ];

    $response = actAsAftersales()->putJson("/returned-products/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('returned-products', $updatedData);
});
