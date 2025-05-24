<?php

use App\Http\Resources\ProjectResource;
use App\Http\Resources\ReturnedProductResource;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of product-restocks', function () {
    $this->dummy->createProductRestock();

    $response = actAsPpcPerencanaan()->getJson('/product-restocks?page=1&perPage=5');

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

test('product restock created when scrapping returned product', function () {
    $returnedProduct = $this->dummy->createReturnedProduct();
    $components = actAsWorkerAftersales()->getJson("/returned-products/{$returnedProduct->id}?intent=" . IntentEnum::WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS->value);
    $component_ids = $components->json('*.id') !== null && !in_array(null, $components->json('*.id'), true) ? array_slice($components->json('*.id'), 0, rand(1, count($components->json('*.id')))) : ($components->json('id') !== null ? [$components->json('id')] : []);

    $response = actAsWorkerAftersales()->putJson("/returned-products/{$returnedProduct->id}?intent=" . IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP->value, [
        'component_ids' => $component_ids,
        'req_production' => true
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('product_restocks', [
        'returned_product_id' => $returnedProduct->id,
        'product_restockable_id' => $returnedProduct->product_returnable->id,
        'product_restockable_type' => get_class($returnedProduct->product_returnable),
        // 'project_id' => $returnedProduct->project_id,
        'status' => ProductRestockStatusEnum::REQUESTED->value,
    ]);
});

test('user can view ProductRestock details', function () {
    $model = $this->dummy->createProductRestock();

    $response = actAsPpcPerencanaan()->getJson("/product-restocks/{$model->id}");

    $response->assertStatus(200)
        ->assertJsonFragment([
            'id' => $model->id,
            'returned_product_id' => $model->returned_product_id,
            // 'returned_product' => ReturnedProductResource::make($model->returned_product)->resolve(),
            'product_restockable_id' => $model->product_restockable_id,
            'product_restockable_type' => $model->product_restockable_type,
            'product_restockable' => $model->product_restockable->toArray(),
            'project_id' => $model->project_id,
            'project' => ProjectResource::make($model->project)->resolve(),
            'status' => $model->status->value,
        ]);
});

test('system can update updated ProductRestock in database', function () {
    $model = $this->dummy->createProductRestock();
    $updatedData = [
        'status' => 'progress',
    ];

    $response = actAsPpcPerencanaan()->putJson("/product-restocks/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('product_restocks', $updatedData);
});

test('initiate planned project create new project', function () {
    $model = $this->dummy->createProductRestock();
    $updatedData = [
        'intent' => IntentEnum::WEB_PRODUCT_RESTOCK_INITIATE_PROJECT->value,
        'project_name' => 'Test Project',
        'project_initial_date' => now()->format('Y-m-d'),
        'product_restock_ids' => [$model->id],
    ];

    $response = actAsPpcPerencanaan()->postJson("/product-restocks", $updatedData);

    $response->assertStatus(200);
    $this->assertDatabaseHas('projects', [
        'name' => $updatedData['project_name'],
        'initial_date' => $updatedData['project_initial_date'],
    ]);
});