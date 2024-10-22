<?php

use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;

beforeEach(function () {
    $this->dummy->createSupervisorElektrik();
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createWorkerElektrik();
    $this->dummy->createWorkerMekanik();
});

test('view all detail-worker-trainsets without intent', function () {
    $this->dummy->createDetailWorkerTrainset();
    // $this->dummy->createTrainsetAttachmentComponent();
    // $this->dummy->createProgressStep();
    // DetailWorkerTrainset::factory()->create();
    actAsSuperAdmin()->get('/api/detail-worker-trainsets')->assertStatus(200);
});

test('view all detail-worker-trainsets by status', function () {
    $this->dummy->createDetailWorkerTrainset();
    $status = DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value;
    actAsSuperAdmin()->get('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200);
});

test('view all detail-worker-trainsets by current user', function () {
    $user = $this->dummy->createWorkerMekanik();
    $this->dummy->createDetailWorkerTrainset(['worker_id' => $user->id]);

    $this->actingAs($user)->getJson('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER->value)
        ->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta']);
});

test('view all detail-worker-trainsets by status and current user', function () {
    $user = $this->dummy->createWorkerMekanik();
    $status = DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value;
    $this->dummy->createDetailWorkerTrainset(['worker_id' => $user->id, 'work_status' => $status]);

    $this->actingAs($user)->getJson('/api/detail-worker-trainsets?intent=' . IntentEnum::API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER->value . '&work_status=' . $status)
        ->assertStatus(200);
});

test('show detail-worker-trainset', function () {
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    actAsSuperAdmin()->getJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id)
        ->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment_component',
            'worker',
            'progress_step',
            'estimated_time',
            'work_status',
            'image_path',
            'acceptance_status',
            'created_at',
            'updated_at'
        ]);
});

test('update detail-worker-trainset to reject work', function () {
    $qc = $this->dummy->createQCMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $this->actingAs($qc)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value,
        'notes' => 'Rejection reason'
    ])->assertStatus(201);
});

test('update detail-worker-trainset to accept work with image', function () {
    $worker = $this->dummy->createWorkerMekanik();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset(['worker_id' => $worker->id]);

    $this->actingAs($worker)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE->value,
        'image_path' => UploadedFile::fake()->image('work.jpg')
    ])->assertStatus(200);
});

test('update fails for non-authorized roles', function () {
    $user = $this->dummy->createWorkerAssembly();
    $detailWorkerTrainset = $this->dummy->createDetailWorkerTrainset();

    $this->actingAs($user)->putJson('/api/detail-worker-trainsets/' . $detailWorkerTrainset->id, [
        'intent' => IntentEnum::API_DETAIL_WORKER_TRAINSET_REJECT_WORK->value,
        'notes' => 'Rejection reason'
    ])->assertStatus(403);
});
