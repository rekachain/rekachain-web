<?php

use App\Http\Resources\ComponentResource;
use App\Models\ReplacementStock;
use App\Models\ReturnedProduct;
use App\Support\Enums\IntentEnum;
use Illuminate\Testing\Fluent\AssertableJson;

test('user can view list of replacement-stocks', function () {
    $this->dummy->createReplacementStock();

    $response = actAsWorkerAftersales()->getJson('/replacement-stocks?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJson(function (AssertableJson $json) {
            $json->has('data.0.component_id')
                ->has('data.0.qty')
                ->etc();
        });
});

test('user can view a create form of replacement-stock', function () {

    $response = actAsWorkerAftersales()->get('/replacement-stocks/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReplacementStock/Create'));
});

test('system can save created replacement-stock to database as ReplacementStock', function () {
    $c = $this->dummy->createComponent();
    $data = [
        'component_id' => $c->id,
        'qty' => 1,
    ];

    $response = actAsWorkerAftersales()->postJson('/replacement-stocks', [
        ...$data,
        'relations' => 'component'
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'component_id', 'component', 'qty']);
    $this->assertDatabaseHas('replacement_stocks', $data);
});

test('user can view ReplacementStock details', function () {
    $model = $this->dummy->createReplacementStock();

    $response = actAsWorkerAftersales()->getJson("/replacement-stocks/{$model->id}?relations=component");

    $response->assertStatus(200)
        ->assertJsonFragment([
            'id' => $model->id, 
            'component_id' => $model->component_id, 
            'component' => ComponentResource::make($model->component)->resolve(), 
            'qty' => $model->qty
        ]);
});

test('user can view edit form of ReplacementStock', function () {
    $model = $this->dummy->createReplacementStock();

    $response = actAsWorkerAftersales()->get("/replacement-stocks/{$model->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('ReplacementStock/Edit'));
});

test('system can update updated ReplacementStock in database', function () {
    $model = $this->dummy->createReplacementStock();
    $updatedData = [
        'qty' => 2,
    ];

    $response = actAsWorkerAftersales()->putJson("/replacement-stocks/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('replacement_stocks', $updatedData);
});

test('system can delete deleted ReplacementStock from database', function () {
    $model = $this->dummy->createReplacementStock();

    $response = actAsWorkerAftersales()->deleteJson("/replacement-stocks/{$model->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('replacement_stocks', ['id' => $model->id]);
});

test('user can get ReplacementStock for problems on selected ReturnedProduct', function () {
    $returnedProduct = ReturnedProduct::whereId(1)->first();
    $product_problems = $returnedProduct->product_problems()->get();
    $components = $product_problems->pluck('component');
    
    $response = actAsWorkerAftersales()->getJson("/returned-products/{$returnedProduct->id}?intent=".IntentEnum::WEB_RETURNED_PRODUCT_GET_PRODUCT_PROBLEM_COMPONENTS->value);
    
    $response->assertStatus(200)
        ->assertJsonCount($components->count());
    $this->assertEquals($components->pluck('id')->toArray(), collect($response->json())->pluck('id')->toArray());
});

test('system can update ReplacementStock qty on selected ReturnedProduct Fix', function () {
    $returnedProduct = ReturnedProduct::whereId(1)->first();
    $product_problems = $returnedProduct->product_problems()->get();
    $componentIds = $product_problems->pluck('component_id')->toArray();
    $qtyBefore = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();

    $reqData = [
        'intent' => IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK->value,
        'component_ids' => $componentIds,
    ];
    
    $response = actAsWorkerAftersales()->putJson("/returned-products/{$returnedProduct->id}", $reqData);
    $response->assertStatus(200);
    
    $qtyAfter = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();

    foreach ($product_problems as $index => $problem) {
        $this->assertEquals($qtyBefore[$index] - 1, $qtyAfter[$index]);
    }
});

test('user can get remaining component on ReturnedProduct', function () {
    $returnedProduct = ReturnedProduct::whereId(1)->first();
    $components = $returnedProduct->serial_panel->panel_attachment->carriage_panel->carriage_panel_components()->get()->pluck('component');
    
    $response = actAsWorkerAftersales()->getJson("/returned-products/{$returnedProduct->id}?intent=".IntentEnum::WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS->value);
    
    $response->assertStatus(200)
        ->assertJsonCount($components->count());
    $this->assertEquals($components->pluck('id')->toArray(), collect($response->json())->pluck('id')->toArray());
});

test('system can update ReplacementStock qty on selected ReturnedProduct Scrap', function () {
    $returnedProduct = ReturnedProduct::whereId(1)->first();
    $components = $returnedProduct->serial_panel->panel_attachment->carriage_panel->carriage_panel_components()->get()->pluck('component');
    $componentIds = $components->pluck('id')->toArray();
    
    $product_problems = $returnedProduct->product_problems()->get();
    $qtyBefore = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();
    $componentIds = $components->diff($product_problems->pluck('component'))->pluck('id')->toArray();

    $reqData = [
        'intent' => IntentEnum::WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP->value,
        'component_ids' => $componentIds,
    ];
    
    $response = actAsWorkerAftersales()->putJson("/returned-products/{$returnedProduct->id}", $reqData);
    $response->assertStatus(200);
    
    $qtyAfter = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();

    foreach ($product_problems as $index => $problem) {
        $this->assertEquals($qtyBefore[$index] + 1, $qtyAfter[$index]);
    }
});

