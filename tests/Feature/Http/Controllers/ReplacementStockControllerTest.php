<?php

use App\Http\Resources\ComponentResource;
use App\Models\ReplacementStock;
use App\Models\ReturnedProduct;
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
    $product_problems = ReturnedProduct::whereId(1)->first()->product_problems()->get();
    $componentIds = $product_problems->pluck('component_id')->toArray();
    $reqData = [
        'intent' => 'web.replacement_stock.post.replacement-stocks',
        'component_ids' => $componentIds,
    ];
    
    
    $response = actAsWorkerAftersales()->postJson('/replacement-stocks', $reqData);
    
    $response->assertStatus(200);
});

test('system can update ReplacementStock qty on selected ReturnedProduct Fix', function () {
    $product_problems = ReturnedProduct::whereId(1)->first()->product_problems()->get();
    $componentIds = $product_problems->pluck('component_id')->toArray();
    $qtyBefore = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();
    $reqData = [
        'intent' => 'web.replacement_stock.post.replacement-stocks',
        'component_ids' => $componentIds,
    ];
    
    actAsWorkerAftersales()->postJson('/replacement-stocks', $reqData);
    
    $qtyAfter = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();

    foreach ($product_problems as $index => $problem) {
        $this->assertEquals($qtyBefore[$index] - 1, $qtyAfter[$index]);
    }
});

test('user can add ReplacementStock with remaining component on ReturnedProduct', function () {
    $components = ReturnedProduct::whereId(1)->first()->panel()->carriage_panel_components()->get();
    $componentIds = $components->pluck('component_id')->toArray();
    $product_problems = ReturnedProduct::whereId(1)->first()->product_problems()->get();
    $componentIds = $components->pluck('component_id')->diff($product_problems->pluck('component_id'))->toArray();
    $reqData = [
        'intent' => 'web.replacement_stock.post.returned_product_change',
        'component_ids' => $componentIds,
    ];
    
    
    $response = actAsWorkerAftersales()->postJson('/replacement-stocks', $reqData);
    
    $response->assertStatus(200);
});

test('system can update ReplacementStock qty on selected ReturnedProduct Change', function () {
    $components = ReturnedProduct::whereId(1)->first()->panel()->carriage_panel_components()->get();
    $componentIds = $components->pluck('component_id')->toArray();
    $product_problems = ReturnedProduct::whereId(1)->first()->product_problems()->get();
    $qtyBefore = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();
    $componentIds = $components->pluck('component_id')->diff($product_problems->pluck('component_id'))->toArray();
    $reqData = [
        'intent' => 'web.replacement_stock.post.returned_product_change',
        'component_ids' => $componentIds,
    ];
    
    actAsWorkerAftersales()->postJson('/replacement-stocks', $reqData);
    
    $qtyAfter = ReplacementStock::whereIn('component_id', $componentIds)->pluck('qty')->toArray();

    foreach ($product_problems as $index => $problem) {
        $this->assertEquals($qtyBefore[$index] + 1, $qtyAfter[$index]);
    }
});

