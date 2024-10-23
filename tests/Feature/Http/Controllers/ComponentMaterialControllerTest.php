<?php

use App\Models\ComponentMaterial;
use App\Models\User;
use App\Support\Enums\IntentEnum;

test('index method returns paginated component-materials', function () {
    $user = User::factory()->create();

    $this->dummy->createComponentMaterial();

    $response = $this->actingAs($user)->getJson('/component-materials?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// NOT YET IMPLEMENTED
// test('create method returns create page', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->get('/component-materials/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ComponentMaterial/Create'));
// });

test('store method creates new component material', function () {
    $user = User::factory()->create();
    $componentMaterialData = [
        'carriage_panel_component_id' => $this->dummy->createCarriagePanelComponent()->id,
        'raw_material_id' => $this->dummy->createRawMaterial()->id,
        'qty' => 5,
    ];

    $response = $this->actingAs($user)->postJson('/component-materials', $componentMaterialData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'carriage_panel_component_id', 'raw_material_id', 'qty']);
    $this->assertDatabaseHas('component_materials', $componentMaterialData);
});

test('show method returns component material details', function () {
    $user = User::factory()->create();
    $componentMaterial = $this->dummy->createComponentMaterial();

    $response = $this->actingAs($user)->getJson("/component-materials/{$componentMaterial->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $componentMaterial->id,
            'carriage_panel_component_id' => $componentMaterial->carriage_panel_component_id,
            'raw_material_id' => $componentMaterial->raw_material_id,
            'qty' => $componentMaterial->qty,
        ]);
});

// NOT YET IMPLEMENTED
// test('edit method returns edit page', function () {
//     $user = User::factory()->create();
//     $componentMaterial = $this->dummy->createComponentMaterial();

//     $response = $this->actingAs($user)->get("/component-materials/{$componentMaterial->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ComponentMaterial/Edit'));
// });

test('update method updates component material', function () {
    $user = User::factory()->create();
    $componentMaterial = $this->dummy->createComponentMaterial();
    $updatedData = [
        'qty' => 10,
    ];

    $response = $this->actingAs($user)->putJson("/component-materials/{$componentMaterial->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('component_materials', $updatedData);
});

test('destroy method deletes component material', function () {
    $user = User::factory()->create();
    $componentMaterial = ComponentMaterial::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/component-materials/{$componentMaterial->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('component_materials', ['id' => $componentMaterial->id]);
});
