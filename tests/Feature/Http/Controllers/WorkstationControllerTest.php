<?php

use App\Models\User;

test('index method returns paginated workstations', function () {
    $user = User::factory()->superAdmin()->create();
    createWorkstation();

    $response = $this->actingAs($user)->getJson('/workstations?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/workstations/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDay/Create'));
// });

test('store method creates new workstation', function () {
    $user = User::factory()->superAdmin()->create();
    $division = createDivision();
    $workshop = createWorkshop();
    $workstationData = [
        'name' => 'Test name',
        'location' => 'Test location',
        'division_id' => $division->id,
        'workshop_id' => $workshop->id,
    ];

    $response = $this->actingAs($user)->postJson('/workstations', $workstationData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'location']);
    $this->assertDatabaseHas('workstations', $workstationData);
});

// NOT IMPLEMENTED
// test('store method imports workstations', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('workstations.xlsx');

//     $response = $this->actingAs($user)->postJson('/workstations', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns workstation details', function () {
    $user = User::factory()->superAdmin()->create();
    $workstation = createWorkstation();

    $response = $this->actingAs($user)->getJson("/workstations/{$workstation->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $workstation->id,
            'name' => $workstation->name,
            'location' => $workstation->location,
        ]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $workstation = createWorkstation();

//     $response = $this->actingAs($user)->get("/workstations/{$workstation->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDay/Edit'));
// });

test('update method updates workstation', function () {
    $user = User::factory()->superAdmin()->create();
    $workstation = createWorkstation();
    $updatedData = [
        'name' => 'Updated name',
        'location' => 'Updated location',
    ];

    $response = $this->actingAs($user)->putJson("/workstations/{$workstation->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('workstations', $updatedData);
});

test('destroy method deletes workstation', function () {
    $user = User::factory()->superAdmin()->create();
    $workstation = createWorkstation();

    $response = $this->actingAs($user)->deleteJson("/workstations/{$workstation->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('workstations', ['id' => $workstation->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/workstations?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('workstations_template.xlsx');
// });
