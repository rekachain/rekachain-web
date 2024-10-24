<?php

use App\Models\User;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Exports\Panel\PanelsTemplateExport;

test('index method returns paginated panels', function () {
    $user = User::factory()->create();
    $this->dummy->createPanel();

    $response = $this->actingAs($user)->getJson('/panels?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/panels/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Panel/Create'));
});

test('store method creates new panel', function () {
    $user = User::factory()->create();
    $progress = $this->dummy->createProgress();
    $panelData = [
        'name' => 'Test name',
        'description' => 'Test description',
        'progress_id' => $progress->id,
    ];

    $response = $this->actingAs($user)->postJson('/panels', $panelData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'description', 'progress_id']);
    $this->assertDatabaseHas('panels', $panelData);
});

// IMPLEMENTED IMPORT PANEL
test('store method imports panels', function () {
    Storage::fake('local');
    $user = User::factory()->create();

    $file = Excel::raw(new PanelsTemplateExport, \Maatwebsite\Excel\Excel::XLSX);
    $uploadedFile = UploadedFile::fake()->createWithContent('panels.xlsx', $file);

    $response = $this->actingAs($user)->postJson('/panels', [
        'intent' => IntentEnum::WEB_PANEL_IMPORT_PANEL->value,
        'import_file' => $uploadedFile,
    ]);

    $response->assertStatus(204);
});

test('show method returns panel details', function () {
    $user = User::factory()->create();
    $panel = $this->dummy->createPanel();

    $response = $this->actingAs($user)->getJson("/panels/{$panel->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $panel->id,
            'name' => $panel->name,
            'description' => $panel->description,
            'progress_id' => $panel->progress_id,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->create();
    $panel = $this->dummy->createPanel();

    $response = $this->actingAs($user)->get("/panels/{$panel->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Panel/Edit'));
});

test('update method updates panel', function () {
    $user = User::factory()->create();
    $panel = $this->dummy->createPanel();
    $newProgress = $this->dummy->createProgress();
    $updatedData = [
        'name' => 'Updated name',
        'description' => 'Updated description',
        'progress_id' => $newProgress->id,
    ];

    $response = $this->actingAs($user)->putJson("/panels/{$panel->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('panels', $updatedData);
});

test('destroy method deletes panel', function () {
    $user = User::factory()->create();
    $panel = $this->dummy->createPanel();

    $response = $this->actingAs($user)->deleteJson("/panels/{$panel->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('panels', ['id' => $panel->id]);
});

// IMPLEMENTED PANEL TEMPLATE
test('index method returns import template', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/panels?intent=' . IntentEnum::WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL->value);

    $response->assertStatus(200)
        ->assertDownload('panels_template.xlsx');
});
