<?php

use App\Models\User;
use App\Models\Project;
use App\Models\Carriage;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;

test('index method returns paginated carriage-presets', function () {
    $user = User::factory()->superAdmin()->create();

    $this->dummy->createCarriagePreset();

    $response = $this->actingAs($user)->getJson('/carriage-presets?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/carriage-presets/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('CarriagePreset/Create'));
// });

test('store method creates new carriagePreset', function () {
    $user = User::factory()->superAdmin()->create();

    $presetTrainset = $this->dummy->createPresetTrainset();
    $carriage = $this->dummy->createCarriage();

    $carriagePresetData = [
        'preset_trainset_id' => $presetTrainset->id,
        'carriage_id' => $carriage->id,
        'qty' => 1,
    ];

    $response = $this->actingAs($user)->postJson('/carriage-presets', $carriagePresetData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'preset_trainset_id', 'carriage_id', 'qty']);
    $this->assertDatabaseHas('carriage_presets', $carriagePresetData);
});

// NOT IMPLEMENTED
// test('store method imports carriage-presets', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('carriage-presets.xlsx');

//     $response = $this->actingAs($user)->postJson('/carriage-presets', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns carriagePreset details', function () {
    $user = User::factory()->superAdmin()->create();

    $carriagePreset = $this->dummy->createCarriagePreset();

    $response = $this->actingAs($user)->getJson("/carriage-presets/{$carriagePreset->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $carriagePreset->id,
            'preset_trainset_id' => $carriagePreset->preset_trainset_id,
            'carriage_id' => $carriagePreset->carriage_id,
            'qty' => $carriagePreset->qty,
        ]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $carriagePreset = CarriagePreset::factory()->create();

//     $response = $this->actingAs($user)->get("/carriage-presets/{$carriagePreset->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('CarriagePreset/Edit'));
// });

test('update method updates carriagePreset', function () {
    $user = User::factory()->superAdmin()->create();

    $carriagePreset = $this->dummy->createCarriagePreset();

    $updatedData = [
        'qty' => 2,
    ];

    $response = $this->actingAs($user)->putJson("/carriage-presets/{$carriagePreset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('carriage_presets', $updatedData);
});

test('destroy method deletes carriagePreset', function () {
    $user = User::factory()->superAdmin()->create();

    $carriagePreset = $this->dummy->createCarriagePreset();

    $response = $this->actingAs($user)->deleteJson("/carriage-presets/{$carriagePreset->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('carriage_presets', ['id' => $carriagePreset->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/carriage-presets?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('carriage-presets_template.xlsx');
// });
