<?php

use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Exports\Trainset\TrainsetsTemplateExport;

test('index method returns paginated trainsets', function () {
    $this->dummy->createTrainset();
    $response = actAsSuperAdmin()->getJson('/trainsets?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta']);
});

test('index method returns import template', function () {
    $response = actAsSuperAdmin()->getJson('/trainsets?intent=' . IntentEnum::WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET->value);

    $response->assertStatus(200)
        ->assertDownload('trainsets_template.xlsx');
});

test('create method returns create page', function () {
    actAsSuperAdmin()->get('/trainsets/create')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Trainset/Create'));
});

test('store method creates new trainset', function () {
    $project = $this->dummy->createProject();
    $trainsetData = [
        'project_id' => $project->id,
        'name' => 'Test Trainset',
    ];

    $response = actAsSuperAdmin()->postJson('/trainsets', $trainsetData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'project_id', 'name']);
    $this->assertDatabaseHas('trainsets', $trainsetData);
});

test('store method imports trainsets', function () {
    Storage::fake('local');

    $file = Excel::raw(new TrainsetsTemplateExport, \Maatwebsite\Excel\Excel::XLSX);
    $uploadedFile = UploadedFile::fake()->createWithContent('trainsets.xlsx', $file);

    $response = actAsSuperAdmin()->postJson('/trainsets', [
        'intent' => IntentEnum::WEB_TRAINSET_IMPORT_TRAINSET->value,
        'import_file' => $uploadedFile,
    ]);

    $response->assertStatus(204);
});

test('show method returns trainset details', function () {
    $trainset = $this->dummy->createTrainset();

    $response = actAsSuperAdmin()->getJson("/trainsets/{$trainset->id}");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'project_id', 'carriages']);
});

test('edit method returns edit page', function () {
    $trainset = $this->dummy->createTrainset();

    $response = actAsSuperAdmin()->get("/trainsets/{$trainset->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Trainset/Edit'));
});

test('update method updates trainset', function () {
    $trainset = $this->dummy->createTrainset();
    $updatedData = [
        'name' => 'Updated Trainset Name',
    ];

    $response = actAsSuperAdmin()->putJson("/trainsets/{$trainset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('trainsets', $updatedData);
});

test('update method changes trainset preset', function () {
    $trainset = $this->dummy->createTrainset();
    $presetTrainset = $this->dummy->createPresetTrainset();

    $response = actAsSuperAdmin()->putJson("/trainsets/{$trainset->id}", [
        'intent' => IntentEnum::WEB_PROJECT_CHANGE_TRAINSET_PRESET->value,
        'preset_trainset_id' => $presetTrainset->id,
    ]);

    $response->assertStatus(200);
    $this->assertDatabaseHas('trainsets', [
        'id' => $trainset->id,
        'preset_trainset_id' => $presetTrainset->id,
    ]);
});

test('update method saves trainset preset', function () {
    $trainset = $this->dummy->createTrainset();

    $response = actAsSuperAdmin()->putJson("/trainsets/{$trainset->id}", [
        'intent' => IntentEnum::WEB_PROJECT_SAVE_TRAINSET_PRESET->value,
        'preset_name' => 'New Preset',
        'project_id' => $trainset->project_id,
    ]);

    $response->assertStatus(200);
    $this->assertDatabaseHas('preset_trainsets', [
        'name' => 'New Preset',
        'project_id' => $trainset->project_id,
    ]);
});

test('destroy method deletes trainset', function () {
    $trainset = $this->dummy->createTrainset();

    $response = actAsSuperAdmin()->deleteJson("/trainsets/{$trainset->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('trainsets', ['id' => $trainset->id]);
});
