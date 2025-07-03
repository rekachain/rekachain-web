<?php

use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Testing\Fluent\AssertableJson;

test('user can view Product Problem list of selected returned-product', function () {
    $model = $this->dummy->createProductProblem();
    $params = [
        'intent' => 'api.returned-product.get.product-problem',
    ];

    $response = actAsWorkerAftersales()->getJson("/api/returned-products/{$model->returned_product_id}?" . http_build_query($params));

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.returned_product_id')
                ->has('data.0.product_restockable_id')
                ->has('data.0.product_restockable_type')
                ->has('data.0.project_id')
                ->has('data.0.status')
                ->etc();
        });
});

test('system can save identified product problem to selected returned-product', function () {
    $model = $this->dummy->createReturnedProduct();
    $data = [
        '_method' => 'PUT',
        'intent' => 'api.returned-product.create.product-problem',
        'component_id' => 1,
        'status' => ProductProblemStatusEnum::PROGRESS->value,
        'image_path' => UploadedFile::fake()->image('image.jpg'),
        'note' => 'Test note',
    ];

    $response = actAsWorkerAftersales()->postJson("/api/returned-products/{$model->id}", $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'product_returnable_id', 'product_returnable_type', 'buyer_id', 'qty', 'serial_number', 'product_problems']);
    $this->assertDatabaseHas('product_problems', Arr::except(array_merge($data, ['returned_product_id' => $model->id]), ['intent', 'image_path', 'note']));
});

test('system can update selected product problem status', function () {
    $model = $this->dummy->createProductProblem();
    $data = [
        'status' => ProductProblemStatusEnum::FIXED->value,
        'note' => 'Test note updated',
    ];

    $response = actAsWorkerAftersales()->putJson("/api/product-problems/{$model->id}", $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'returned_product_id', 'component_id', 'status']);
    $this->assertDatabaseHas('product_problems', Arr::except(array_merge($data, ['returned_product_id' => $model->returned_product_id, 'component_id' => $model->component_id]), ['note']));
    $this->assertDatabaseHas('product_problem_notes', [
        'product_problem_id' => $model->id,
        'note' => $data['note'],
    ]);
});
