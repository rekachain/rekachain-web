<?php

use App\Models\ComponentMaterial;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated component-materials', function () {
    $user = User::factory()->superAdmin()->create();
    createComponentMaterial();

    $response = $this->actingAs($user)->getJson('/component-materials?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/component-materials/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ComponentMaterial/Create'));
// });

test('store method creates new component', function () {
    $user = User::factory()->superAdmin()->create();
    $progress = createProgress();
    $rawMaterial = createRawMaterial();
    $carriagePanelComponent = createCarriagePanelComponent($progress);

    $componentMaterialData = [
        'carriage_panel_component_id' => $carriagePanelComponent->id,
        'raw_material_id' => $rawMaterial->id,
        'qty' => 4,
    ];

    $response = $this->actingAs($user)->postJson('/component-materials', $componentMaterialData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'carriage_panel_component_id', 'raw_material_id', 'qty']);
    $this->assertDatabaseHas('component_materials', $componentMaterialData);
});

// test('store method imports component-materials', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('component-materials.xlsx');

//     $response = $this->actingAs($user)->postJson('/component-materials', [
//         'intent' => IntentEnum::WEB_component_IMPORT_component->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns component details', function () {
    $user = User::factory()->superAdmin()->create();
    $componentMaterial = createComponentMaterial();

    $response = $this->actingAs($user)->getJson("/component-materials/{$componentMaterial->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $componentMaterial->id,
            'carriage_panel_component_id' => $componentMaterial->carriage_panel_component_id,
            'raw_material_id' => $componentMaterial->raw_material_id,
            'qty' => $componentMaterial->qty,
        ]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $componentMaterial = createComponentMaterial();

//     $response = $this->actingAs($user)->get("/component-materials/{$componentMaterial->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ComponentMaterial/Edit'));
// });

test('update method updates component', function () {
    $user = User::factory()->superAdmin()->create();
    $componentMaterial = createComponentMaterial();
    $updatedData = [
        'qty' => '999',
    ];

    $response = $this->actingAs($user)->putJson("/component-materials/{$componentMaterial->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('component_materials', $updatedData);
});

test('destroy method deletes component', function () {
    $user = User::factory()->superAdmin()->create();
    $componentMaterial = createComponentMaterial();

    $response = $this->actingAs($user)->deleteJson("/component-materials/{$componentMaterial->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('component_materials', ['id' => $componentMaterial->id]);
});

// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/component-materials?intent=' . IntentEnum::WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT->value);

//     $response->assertStatus(200)
//         ->assertDownload('component_template.xlsx');
// });
