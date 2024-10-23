<?php

use App\Models\User;
use App\Models\ProgressStep;
use App\Models\Progress;
use App\Models\Step;

test('index method returns paginated progress-steps', function () {
    $user = User::factory()->superAdmin()->create();

    $this->dummy->createProgressStep();

    $response = $this->actingAs($user)->getJson('/progress-steps?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});
// NOT READY
// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/progress-steps/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ProgressStep/Create'));
// });

test('store method creates new progress-step', function () {
    $user = User::factory()->superAdmin()->create();
    $progress = $this->dummy->createProgress();
    $step = $this->dummy->createStep();
    $progressStepData = [
        'progress_id' => $progress->id,
        'step_id' => $step->id,
    ];

    $response = $this->actingAs($user)->postJson('/progress-steps', $progressStepData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'progress_id', 'step_id']);
    $this->assertDatabaseHas('progress_steps', $progressStepData);
});

test('show method returns progress-step details', function () {
    $user = User::factory()->superAdmin()->create();

    $progressStep = $this->dummy->createProgressStep();

    $response = $this->actingAs($user)->getJson("/progress-steps/{$progressStep->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $progressStep->id,
            'progress_id' => $progressStep->progress_id,
            'step_id' => $progressStep->step_id,
        ]);
});

// NOT READY
// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $progressStep = $this->dummy->createProgressStep();

//     $response = $this->actingAs($user)->get("/progress-steps/{$progressStep->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('ProgressStep/Edit'));
// });

test('update method updates progress-step', function () {
    $user = User::factory()->superAdmin()->create();

    $progressStep = $this->dummy->createProgressStep();
    $newStep = $this->dummy->createStep();
    $updatedData = [
        'step_id' => $newStep->id,
    ];

    $response = $this->actingAs($user)->putJson("/progress-steps/{$progressStep->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('progress_steps', $updatedData);
});

test('destroy method deletes progress-step', function () {
    $user = User::factory()->superAdmin()->create();

    $progressStep = $this->dummy->createProgressStep();

    $response = $this->actingAs($user)->deleteJson("/progress-steps/{$progressStep->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('progress_steps', ['id' => $progressStep->id]);
});
