<?php

use App\Models\Progress;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated progress', function () {
    $user = User::factory()->superAdmin()->create();

    $this->dummy->createProgress();

    $response = $this->actingAs($user)->getJson('/progress?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/progress/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('Progress/Create'));
// });

test('store method creates new progress', function () {
    $user = User::factory()->superAdmin()->create();

    $workAspect = $this->dummy->createWorkAspect();
    $progressData = [
        'name' => 'Test name',
        'work_aspect_id' => $workAspect->id,
    ];

    $response = $this->actingAs($user)->postJson('/progress', $progressData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('progress', $progressData);
});

// test('store method imports progress', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('progress.xlsx');

//     $response = $this->actingAs($user)->postJson('/progress', [
//         'intent' => IntentEnum::WEB_PROGRESS_IMPORT_PROGRESS->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns progress details', function () {
    $user = User::factory()->superAdmin()->create();
    $progress = $this->dummy->createProgress();

    $response = $this->actingAs($user)->getJson("/progress/{$progress->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $progress->id, 'name' => $progress->name]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $progress = $this->dummy->createProgress();

//     $response = $this->actingAs($user)->get("/progress/{$progress->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('Progress/Edit'));
// });

test('update method updates progress', function () {
    $user = User::factory()->superAdmin()->create();
    $progress = $this->dummy->createProgress();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = $this->actingAs($user)->putJson("/progress/{$progress->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('progress', $updatedData);
});

test('destroy method deletes progress', function () {
    $user = User::factory()->superAdmin()->create();
    $progress = $this->dummy->createProgress();

    $response = $this->actingAs($user)->deleteJson("/progress/{$progress->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('progress', ['id' => $progress->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->getJson('/progress?intent=' . IntentEnum::WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS->value);

    $response->assertStatus(200)
        ->assertDownload('progress_template.xlsx');
});
