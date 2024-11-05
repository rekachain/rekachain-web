<?php

use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

beforeEach(function () {
    $this->dummy->createSupervisorElektrik();
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createWorkerElektrik();
    $this->dummy->createWorkerMekanik();
});

test('view all detail-worker-trainsets without intent', function () {
    $this->dummy->createDetailWorkerTrainset();
    actAsSuperAdmin()->get('/api/detail-worker-trainsets')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'trainset_attachment',
                    'trainset_attachment_component_id',
                    'trainset_attachment_component',
                    'worker_id',
                    'worker',
                    'progress_step_id',
                    'progress_step',
                    'estimated_time',
                    'work_status',
                    'image_path',
                    'acceptance_status',
                    'failed_component_manufactures',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('view all detail-worker-trainsets by status', function () {
    $this->dummy->createDetailWorkerTrainset();
    $status = DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value;
    actAsSuperAdmin()->get('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'trainset_attachment_component_id',
                    'worker_id',
                    'progress_step_id',
                    'estimated_time',
                    'work_status',
                    'image_path',
                    'acceptance_status',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('view all detail-worker-trainsets by current user', function () {
    $user = $this->dummy->createWorkerMekanik();
    $this->dummy->createDetailWorkerTrainset(['worker_id' => $user->id]);

    $this->actingAs($user)->getJson('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER->value)
        ->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'trainset_attachment_component_id',
                    'worker_id',
                    'progress_step_id',
                    'estimated_time',
                    'work_status',
                    'image_path',
                    'acceptance_status',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('view all detail-worker-trainsets by status and current user', function () {
    $user = $this->dummy->createWorkerMekanik();
    $status = DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value;
    $this->dummy->createDetailWorkerTrainset(['worker_id' => $user->id, 'work_status' => $status]);

    $this->actingAs($user)->getJson('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER->value . '&work_status=' . $status)
        ->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'trainset_attachment_component_id',
                    'worker_id',
                    'progress_step_id',
                    'estimated_time',
                    'work_status',
                    'image_path',
                    'acceptance_status',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);;
});

test('show detail-worker-trainset w/o intent', function () {
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    actAsSuperAdmin()->getJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id)
        ->assertStatus(200)
        ->assertJson([
            'id' => $detailWorkerTrainset->id,
            'trainset_attachment_component_id' => $detailWorkerTrainset->trainset_attachment_component_id,
            'worker_id' => $detailWorkerTrainset->worker_id,
            'progress_step_id' => $detailWorkerTrainset->progress_step_id,
            'estimated_time' => $detailWorkerTrainset->estimated_time,
            'work_status' => $detailWorkerTrainset->work_status->value,
            'image_path' => $detailWorkerTrainset->image_path,
            'acceptance_status' => $detailWorkerTrainset->acceptance_status->value,
        ]);
});

test('show detail-worker-trainset w/ intent', function () {
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    actAsSuperAdmin()->getJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS->value)
        ->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment',
            'trainset_attachment_component',
            'worker',
            'progress_step',
            'estimated_time',
            'work_status',
            'image_path',
            'acceptance_status',
            'created_at',
            'updated_at',
        ]);
});

test('update detail-worker-trainset to assign request worker', function () {
    $spvMekanik = $this->dummy->createSupervisorMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $this->actingAs($spvMekanik)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_ASSIGN_REQUEST_WORKER->value,
        'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value,
    ])->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment_component_id',
            'worker_id',
            'progress_step_id',
            'estimated_time',
            'work_status',
            'image_path',
            'acceptance_status',
            'created_at',
            'updated_at',
        ]);
});

test('update detail-worker-trainset to reject work', function () {
    $qc = $this->dummy->createQCMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $response = $this->actingAs($qc)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value,
        'notes' => 'Rejection reason'
    ])->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment_component_id',
            'worker_id',
            'progress_step_id',
            'estimated_time',
            'work_status',
            'image_path',
            'acceptance_status',
            'failed_component_manufactures',
            'created_at',
            'updated_at',
        ]);
});

test('update detail-worker-trainset to accept work with image', function () {
    $worker = $this->dummy->createWorkerMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset(['worker_id' => $worker->id]);

    $this->actingAs($worker)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value,
        'image_path' => UploadedFile::fake()->image('work.jpg')
    ])->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'image_path',
        ]);
});

test('update fails for non-authorized roles', function () {
    $user = $this->dummy->createWorkerAssembly();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $this->actingAs($user)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value,
        'notes' => 'Rejection reason'
    ])->assertStatus(403);
});
