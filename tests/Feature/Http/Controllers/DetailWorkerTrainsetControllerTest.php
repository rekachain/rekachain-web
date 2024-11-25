<?php

use App\Models\User;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

beforeEach(function () {
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createSupervisorElektrik();
});

test('index method returns paginated detail-worker-trainsets', function () {
    $user = User::factory()->superAdmin()->create();

    $this->dummy->createDetailWorkerTrainset();

    $response = $this->actingAs($user)->getJson('/detail-worker-trainsets?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// NOT IMPLEMENTED YET
// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/detail-worker-trainsets/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerTrainset/Create'));
// });

test('store method creates new DetailWorkerTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $userMekanik = $this->dummy->createWorkerMekanik();
    $progressStep = $this->dummy->createProgressStep();
    // $trainsetAttachment = $this->dummy->createTrainsetAttachment($userMekanik);
    $trainsetAttachmentComponent = $this->dummy->createTrainsetAttachmentComponent();

    $detailWorkerTrainsetData = [
        'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
        'worker_id' => $user->id,
        'progress_step_id' => $progressStep->id,
        'estimated_time' => 7,
        'work_status' => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
        'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value
    ];

    $response = $this->actingAs($user)->postJson('/detail-worker-trainsets', $detailWorkerTrainsetData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'trainset_attachment_component_id', 'worker_id', 'progress_step_id', 'estimated_time', 'work_status', 'acceptance_status']);
    $this->assertDatabaseHas('detail_worker_trainsets', $detailWorkerTrainsetData);
});

test('show method returns DetailWorkerTrainset details', function () {
    $user = User::factory()->superAdmin()->create();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $response = $this->actingAs($user)->getJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $detailWorkerTrainset->id,
            'trainset_attachment_component_id' => $detailWorkerTrainset->trainset_attachment_component_id,
            'worker_id' => $detailWorkerTrainset->worker_id,
            'progress_step_id' => $detailWorkerTrainset->progress_step_id,
            'estimated_time' => $detailWorkerTrainset->estimated_time,
            'work_status' => $detailWorkerTrainset->work_status->value,
            'acceptance_status' => $detailWorkerTrainset->acceptance_status->value,
        ]);
});

// NOT IMPLEMENTED YET
// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

//     $response = $this->actingAs($user)->get("/detail-worker-trainsets/{$detailWorkerTrainset->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerTrainset/Edit'));
// });

test('update method updates DetailWorkerTrainset', function () {
    // $user = User::factory()->superAdmin()->create();
    $user = $this->dummy->createSupervisorMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();
    $updatedData = [
        'estimated_time' => 35,
        'work_status' => DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value,
        'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::DECLINED->value,
    ];

    $response = $this->actingAs($user)->putJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('detail_worker_trainsets', $updatedData);
});

test('destroy method deletes DetailWorkerTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $response = $this->actingAs($user)->deleteJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('detail_worker_trainsets', ['id' => $detailWorkerTrainset->id]);
});
