<?php

use App\Models\RawMaterial;
use App\Models\User;
use App\Support\Enums\IntentEnum;

test('index method returns paginated raw-materials', function () {
    $user = User::factory()->superAdmin()->create();
    RawMaterial::factory()->count(5)->create();

    $response = $this->actingAs($user)->getJson('/raw-materials?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/raw-materials/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('RawMaterial/Create'));
});

test('store method creates new rawMaterial', function () {
    $user = User::factory()->superAdmin()->create();
    $rawMaterialData = [
        'material_code' => 'Test material code',
        'description' => 'Test description',
        'unit' => 'Test unit',
        'specs' => 'Test specs',
    ];

    $response = $this->actingAs($user)->postJson('/raw-materials', $rawMaterialData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'material_code', 'description', 'unit', 'specs']);
    $this->assertDatabaseHas('raw_materials', $rawMaterialData);
});

test('show method returns rawMaterial details', function () {
    $user = User::factory()->superAdmin()->create();
    $rawMaterial = RawMaterial::factory()->create();

    $response = $this->actingAs($user)->getJson("/raw-materials/{$rawMaterial->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $rawMaterial->id,
            'material_code' => $rawMaterial->material_code,
            'description' => $rawMaterial->description,
            'unit' => $rawMaterial->unit,
            'specs' => $rawMaterial->specs,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $rawMaterial = RawMaterial::factory()->create();

    $response = $this->actingAs($user)->get("/raw-materials/{$rawMaterial->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('RawMaterial/Edit'));
});

test('update method updates rawMaterial', function () {
    $user = User::factory()->superAdmin()->create();
    $rawMaterial = RawMaterial::factory()->create();
    $updatedData = [
        'material_code' => 'updated material_code',
        'description' => 'updated description',
        'unit' => 'updated unit',
        'specs' => 'updated specs',
    ];

    $response = $this->actingAs($user)->putJson("/raw-materials/{$rawMaterial->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('raw_materials', $updatedData);
});

test('destroy method deletes rawMaterial', function () {
    $user = User::factory()->superAdmin()->create();
    $rawMaterial = RawMaterial::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/raw-materials/{$rawMaterial->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('raw_materials', ['id' => $rawMaterial->id]);
});

// IMPLEMENTED RAW MATERIAL TEMPLATE
test('index method returns import template', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->getJson('/raw-materials?intent=' . IntentEnum::WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL->value);

    $response->assertStatus(200)
        ->assertDownload('rawMaterials_template.xlsx');
});
