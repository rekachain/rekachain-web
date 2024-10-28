<?php

use App\Models\User;
use App\Models\RawMaterial;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Support\Enums\PermissionEnum;
use Illuminate\Support\Facades\Storage;
use App\Exports\RawMaterial\RawMaterialsTemplateExport;

test('index method returns paginated raw-materials', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_READ->value);
    RawMaterial::factory()->count(15)->create();

    $response = $this->actingAs($user)->getJson('/raw-materials?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(10, 'data');
});

test('index method returns all raw-materials', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_READ->value);
    RawMaterial::factory()->count(15)->create();

    $response = $this->actingAs($user)->getJson('/raw-materials?perPage=All');

    $response->assertStatus(200)
        ->assertJsonStructure(['data'])
        ->assertJsonCount(15, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_CREATE->value);

    $response = $this->actingAs($user)->get('/raw-materials/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('RawMaterial/Create'));
});

test('store method creates new rawMaterial', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_CREATE->value);
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

    RawMaterial::deleteWhere(['material_code' => $rawMaterialData['material_code']]);
});

test('store method imports raw materials', function () {
    Storage::fake('local');
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_CREATE->value);

    $file = Excel::raw(new RawMaterialsTemplateExport, \Maatwebsite\Excel\Excel::XLSX);
    $uploadedFile = UploadedFile::fake()->createWithContent('raw-materials.xlsx', $file);

    $response = $this->actingAs($user)->postJson('/raw-materials', [
        'intent' => IntentEnum::WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL->value,
        'import_file' => $uploadedFile,
    ]);

    $response->assertStatus(204);
});

test('show method returns rawMaterial details', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_READ->value);
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
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_UPDATE->value);
    $rawMaterial = RawMaterial::factory()->create();

    $response = $this->actingAs($user)->get("/raw-materials/{$rawMaterial->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('RawMaterial/Edit'));
});

test('update method updates rawMaterial', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_UPDATE->value);
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
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_DELETE->value);
    $rawMaterial = RawMaterial::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/raw-materials/{$rawMaterial->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('raw_materials', ['id' => $rawMaterial->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->create()->givePermissionTo(PermissionEnum::RAW_MATERIAL_READ->value);

    $response = $this->actingAs($user)->getJson('/raw-materials?intent=' . IntentEnum::WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL->value);

    $response->assertStatus(200)
        ->assertDownload('rawMaterials_template.xlsx');
});
