<?php

use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Exports\Step\StepsTemplateExport;

test('index method returns paginated steps', function () {
    $this->dummy->createStep();
    $response = actAsSuperAdmin()->getJson('/steps?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');;
});

test('create method returns create page', function () {
    actAsSuperAdmin()->get('/steps/create')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Step/Create'));
});

test('store method creates new step', function () {
    $stepData = [
        'name' => 'Test Step',
        'process' => 'Test Process',
        'estimated_time' => 60,
    ];

    $response = actAsSuperAdmin()->postJson('/steps', $stepData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'process', 'estimated_time']);
    $this->assertDatabaseHas('steps', $stepData);
});

test('store method imports steps', function () {
    Storage::fake('local');

    $file = Excel::raw(new StepsTemplateExport, \Maatwebsite\Excel\Excel::XLSX);
    $uploadedFile = UploadedFile::fake()->createWithContent('steps.xlsx', $file);

    $response = actAsSuperAdmin()->postJson('/steps', [
        'intent' => IntentEnum::WEB_STEP_IMPORT_STEP->value,
        'import_file' => $uploadedFile,
    ]);

    $response->assertStatus(204);
});


test('show method returns step details', function () {
    $step = $this->dummy->createStep();

    $response = actAsSuperAdmin()->getJson("/steps/{$step->id}");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'process', 'estimated_time', 'can_be_deleted']);
});

test('edit method returns edit page', function () {
    $step = $this->dummy->createStep();

    $response = actAsSuperAdmin()->get("/steps/{$step->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Step/Edit'));
});

test('update method updates step', function () {
    $step = $this->dummy->createStep();
    $updatedData = [
        'name' => 'Updated Step',
        'process' => 'Updated Process',
        'estimated_time' => 90,
    ];

    $response = actAsSuperAdmin()->putJson("/steps/{$step->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'process', 'estimated_time']);
    $this->assertDatabaseHas('steps', $updatedData);
});

test('destroy method deletes step', function () {
    $step = $this->dummy->createStep();

    $response = actAsSuperAdmin()->deleteJson("/steps/{$step->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('steps', ['id' => $step->id]);
});

test('index method returns import template', function () {
    $response = actAsSuperAdmin()->getJson('/steps?intent=' . IntentEnum::WEB_STEP_GET_TEMPLATE_IMPORT_STEP->value);

    $response->assertStatus(200)
        ->assertDownload('steps_template.xlsx');
});
