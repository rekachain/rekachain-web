<?php

use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Http\UploadedFile;

test('scanned ReturnedProduct show Product details', function () {
    $model = $this->dummy->createSerialPanel();
    $params = [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR->value,
        'qr_code' => $model->qr_code,
    ];

    $response = actAsWorkerAftersales()->getJson("/api/panel-attachments/{$model->panel_attachment_id}?" . http_build_query($params));

    $response->assertStatus(200)
        ->assertJsonFragment([
            'serial_number' => $model->id,
            'product_number' => $model->product_no,
            'panel' => $model->panel_attachment->carriage_panel->panel->name,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
        ]);
});

test('system can save created returned-product to database', function () {
    $data = [
        'serial_number' => '1234567890',
        'status' => ReturnedProductStatusEnum::PROGRESS->value,
        'image_path' => UploadedFile::fake()->image('image.jpg'),
        'note' => 'Test note',
    ];

    $response = actAsWorkerAftersales()->postJson('/api/returned-products', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'product_returnable_id', 'product_returnable_type', 'product_return', 'buyer_id', 'buyer', 'qty', 'serial_number']);
    $this->assertDatabaseHas('returned_products', Arr::except($data, ['image_path']));
});

test('system can save identified product problem of returned-product to database', function () {
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

test('system can update identified product problem status of returned-product to database', function () {
    $model = $this->dummy->createProductProblem();
    $data = [
        'intent' => 'api.returned-product.update.product-problem',
        'product_problem_id' => $model->id,
        'status' => ProductProblemStatusEnum::FIXED->value,
        'note' => 'Test note updated',
    ];

    $response = actAsWorkerAftersales()->putJson("/api/returned-products/{$model->returned_product_id}", $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'returned_product_id', 'component_id', 'status']);
    $this->assertDatabaseHas('product_problems', Arr::except(array_merge($data, ['returned_product_id' => $model->returned_product_id, 'component_id' => $model->component_id]), ['intent', 'product_problem_id', 'note']));
});

test('system can update updated ReturnedProduct in database', function () {
    $model = $this->dummy->createReturnedProduct();
    $updatedData = [
        'status' => ReturnedProductStatusEnum::DONE->value,
    ];

    $response = actAsWorkerAftersales()->putJson("/api/returned-products/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('returned_products', $updatedData);
});