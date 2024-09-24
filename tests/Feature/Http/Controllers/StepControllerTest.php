<?php

use App\Models\Step;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated steps', function () {
    $user = User::factory()->create();
    Step::factory()->count(5)->create();

    $response = $this->actingAs($user)->getJson('/steps?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/steps/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Step/Create'));
});

test('store method creates new step', function () {
    $user = User::factory()->create();
    $stepData = [
        'name' => 'Test name',
        'process' => 'Test process',
    ];

    $response = $this->actingAs($user)->postJson('/steps', $stepData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'process']);
    $this->assertDatabaseHas('steps', $stepData);
});

// test('store method imports steps', function () {
//     Storage::fake('local');
//     $user = User::factory()->create();
//     $file = UploadedFile::fake()->create('steps.xlsx');

//     $response = $this->actingAs($user)->postJson('/steps', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns step details', function () {
    $user = User::factory()->create();
    $step = Step::factory()->create();

    $response = $this->actingAs($user)->getJson("/steps/{$step->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $step->id,
            'progress_id' => $step->progress_id,
            'process' => $step->process,
            'estimated_time' => $step->estimated_time,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->create();
    $step = Step::factory()->create();

    $response = $this->actingAs($user)->get("/steps/{$step->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Step/Edit'));
});

test('update method updates step', function () {
    $user = User::factory()->create();
    $step = Step::factory()->create();
    $updatedData = [
        'name' => 'Updated name',
        'process' => 'Updated process',
    ];

    $response = $this->actingAs($user)->putJson("/steps/{$step->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('steps', $updatedData);
});

test('destroy method deletes step', function () {
    $user = User::factory()->create();
    $step = Step::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/steps/{$step->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('steps', ['id' => $step->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/steps?intent=' . IntentEnum::WEB_STEP_GET_TEMPLATE_IMPORT_STEP->value);

    $response->assertStatus(200)
        ->assertDownload('steps_template.xlsx');
});
