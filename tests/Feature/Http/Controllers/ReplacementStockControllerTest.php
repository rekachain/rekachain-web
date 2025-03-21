<?php

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

    $response = actAsWorkerAftersales()->postJson('/replacement-stocks', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'component_id', 'component', 'qty']);
    $this->assertDatabaseHas('replacement_stocks', $data);
});

test('user can view ReplacementStock details', function () {
    $model = $this->dummy->createReplacementStock();

    $response = actAsWorkerAftersales()->getJson("/replacement-stocks/{$model->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $model->id, 'component_id' => $model->component_id, 'qty' => $model->qty]);
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