<?php

use App\Models\User;

test('index method returns paginated workshops', function () {
    $user = User::factory()->superAdmin()->create();
    createWorkshop();

    $response = $this->actingAs($user)->getJson('/workshops?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(2, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/workshops/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Workshop/Create'));
});

test('store method creates new workshop', function () {
    $user = User::factory()->superAdmin()->create();
    $workshopData = [
        'name' => 'Test name',
        'address' => 'Test address',
    ];

    $response = $this->actingAs($user)->postJson('/workshops', $workshopData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'address']);
    $this->assertDatabaseHas('workshops', $workshopData);
});

// NOT IMPLEMENTED
// test('store method imports workshops', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('workshops.xlsx');

//     $response = $this->actingAs($user)->postJson('/workshops', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns workshop details', function () {
    $user = User::factory()->superAdmin()->create();
    $workshop = createWorkshop();

    $response = $this->actingAs($user)->getJson("/workshops/{$workshop->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $workshop->id,
            'name' => $workshop->name,
            'address' => $workshop->address,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $workshop = createWorkshop();

    $response = $this->actingAs($user)->get("/workshops/{$workshop->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Workshop/Edit'));
});

test('update method updates workshop', function () {
    $user = User::factory()->superAdmin()->create();
    $workshop = createWorkshop();
    $updatedData = [
        'name' => 'Updated name',
        'address' => 'Updated address',
    ];

    $response = $this->actingAs($user)->putJson("/workshops/{$workshop->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('workshops', $updatedData);
});

test('destroy method deletes workshop', function () {
    $user = User::factory()->superAdmin()->create();
    $workshop = createWorkshop();

    $response = $this->actingAs($user)->deleteJson("/workshops/{$workshop->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('workshops', ['id' => $workshop->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/workshops?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('workshops_template.xlsx');
// });
