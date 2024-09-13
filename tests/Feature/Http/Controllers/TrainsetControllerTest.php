<?php

use App\Models\Trainset;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated trainsets', function () {
    $user = User::factory()->create();
    createTrainset();

    $response = $this->actingAs($user)->getJson('/trainsets?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->get('/trainsets/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('Trainset/Create'));
// });

test('store method creates new trainset', function () {
    $user = User::factory()->create();
    $project = createProject();
    $trainsetData = [
        'project_id' => $project->id,
        'name' => 'Test name',
    ];

    $response = $this->actingAs($user)->postJson('/trainsets', $trainsetData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'project_id', 'name']);
    $this->assertDatabaseHas('trainsets', $trainsetData);
});

// test('store method imports trainsets', function () {
//     Storage::fake('local');
//     $user = User::factory()->create();
//     $file = UploadedFile::fake()->create('trainsets.xlsx');

//     $response = $this->actingAs($user)->postJson('/trainsets', [
//         'intent' => IntentEnum::WEB_trainset_IMPORT_trainset->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns trainset details', function () {
    $user = User::factory()->create();
    $trainset = createTrainset();

    $response = $this->actingAs($user)->getJson("/trainsets/{$trainset->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $trainset->id, 'name' => $trainset->name]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->create();
//     $trainset = createTrainset();)

//     $response = $this->actingAs($user)->get("/trainsets/{$trainset->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('Trainset/Edit'));
// });

test('update method updates trainset', function () {
    $user = User::factory()->create();
    $trainset = createTrainset();
    $updatedData = [
        'name' => 'Updated name',
        'project_id' => $trainset->project_id,
    ];

    $response = $this->actingAs($user)->putJson("/trainsets/{$trainset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('trainsets', $updatedData);
});

test('destroy method deletes trainset', function () {
    $user = User::factory()->create();
    $trainset = createTrainset();

    $response = $this->actingAs($user)->deleteJson("/trainsets/{$trainset->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('trainsets', ['id' => $trainset->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/trainsets?intent=' . IntentEnum::WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET->value);

    $response->assertStatus(200)
        ->assertDownload('trainsets_template.xlsx');
});
