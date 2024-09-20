<?php

use App\Models\User;
use App\Models\Panel;
use App\Models\Progress;
use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;

test('index method returns paginated carriage-panels', function () {
    $user = User::factory()->superAdmin()->create();
    createProgress();
    createPanel();
    createCarriageTrainset();
    CarriagePanel::factory()->count(5)->create();

    $response = $this->actingAs($user)->getJson('/carriage-panels?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/carriage-panels/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('CarriagePanel/Create'));
// });

test('store method creates new carriagePanel', function () {
    $user = User::factory()->superAdmin()->create();
    createProgress();
    createPanel();
    createCarriageTrainset();
    $carriagePanelData = [
        'progress_id' => Progress::inRandomOrder()->first()->id,
        'carriage_trainset_id' => CarriageTrainset::inRandomOrder()->first()->id,
        'panel_id' => Panel::inRandomOrder()->first()->id,
        'qty' => 1,
    ];
    
    $response = $this->actingAs($user)->post('/carriage-panels', $carriagePanelData);
    
    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'progress_id', 'carriage_trainset_id', 'panel_id', 'qty']);
    $this->assertDatabaseHas('carriage_panels', $carriagePanelData);
});

// NOT IMPLEMENTED
// test('store method imports carriage-panels', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('carriage-panels.xlsx');

//     $response = $this->actingAs($user)->postJson('/carriage-panels', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns carriagePanel details', function () {
    $user = User::factory()->superAdmin()->create();
    createProgress();
    createPanel();
    createCarriageTrainset();
    $carriagePanel = CarriagePanel::factory()->create();

    $response = $this->actingAs($user)->getJson("/carriage-panels/{$carriagePanel->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $carriagePanel->id,
            'progress_id' => $carriagePanel->progress_id,
            'carriage_trainset_id' => $carriagePanel->carriage_trainset_id,
            'panel_id' => $carriagePanel->panel_id,
            'qty' => $carriagePanel->qty,
        ]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $carriagePanel = CarriagePanel::factory()->create();

//     $response = $this->actingAs($user)->get("/carriage-panels/{$carriagePanel->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('CarriagePanel/Edit'));
// });

test('update method updates carriagePanel', function () {
    $user = User::factory()->superAdmin()->create();
    createProgress();
    createPanel();
    createCarriageTrainset();
    $carriagePanel = CarriagePanel::factory()->create();
    $updatedData = [
        'qty' => 2,
    ];

    $response = $this->actingAs($user)->putJson("/carriage-panels/{$carriagePanel->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('carriage_panels', $updatedData);
});

test('destroy method deletes carriagePanel', function () {
    $user = User::factory()->superAdmin()->create();
    createProgress();
    createPanel();
    createCarriageTrainset();
    $carriagePanel = CarriagePanel::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/carriage-panels/{$carriagePanel->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('carriage_panels', ['id' => $carriagePanel->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/carriage-panels?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('carriage-panels_template.xlsx');
// });