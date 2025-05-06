<?php

use App\Http\Resources\ProjectResource;
use App\Http\Resources\ReturnedProductResource;
use App\Support\Enums\IntentEnum;
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
    print_r($components);

    $response = actAsWorkerAftersales()->putJson("/returned-products/{$returnedProduct->id}?intent=" . IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP->value, [
        'component_ids' => array_slice($components->json('data.*.id'), 0, rand(1, 3)),
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('product_restocks', [
        'returned_product_id' => $returnedProduct->id,
        'product_restockable_id' => $returnedProduct->id,
        'product_restockable_type' => get_class($returnedProduct),
        'project_id' => $returnedProduct->project_id,
        'status' => 1,
    ]);
});

test('user can view ProductRestock details', function () {
    $model = $this->dummy->createProductRestock();

    $response = actAsPpcPerencanaan()->getJson("/product-restocks/{$model->id}");

    $response->assertStatus(200)
        ->assertJsonFragment([
            'id' => $model->id,
            'returned_product_id' => $model->returned_product_id,
            'returned_product' => ReturnedProductResource::make($model->returned_product)->resolve(),
            'product_restockable_id' => $model->product_restockable_id,
            'product_restockable_type' => $model->product_restockable_type,
            'product_restockable' => $model->product_restockable->toArray(),
            'project_id' => $model->project_id,
            'project' => ProjectResource::make($model->project)->resolve(),
            'status' => $model->status->value,
        ]);
});


test('user can view product-restock edit page', function () {
    $model = $this->dummy->createProductRestock();

    $response = actAsPpcPerencanaan()->get("/product-restocks/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductRestock/Edit'));
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


test('user can view project planning form for product restock', function () {
    $response = actAsPpcPerencanaan()->get("/product-restocks?intent=web.product.restock.add.project");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ProductRestock/ProjectPlanning'));
});

test('initiate planned project create new project', function () {
    $model = $this->dummy->createProductRestock();
    $updatedData = [
        'intent' => 'web.product.restock.add.project',
        'product_restock_ids' => [$model->id],
    ];

    $response = actAsPpcPerencanaan()->putJson("/product-restocks/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('product_restocks', $updatedData);
});