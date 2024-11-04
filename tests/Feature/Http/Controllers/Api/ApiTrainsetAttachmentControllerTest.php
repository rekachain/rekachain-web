<?php

use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use App\Models\TrainsetAttachment;
use App\Http\Resources\UserResource;
use App\Http\Resources\TrainsetResource;
use App\Http\Resources\WorkstationResource;
use App\Http\Resources\AttachmentNoteResource;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Http\Resources\TrainsetAttachmentComponentResource;

beforeEach(function () {
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createSupervisorElektrik();
});

test('index returns paginated trainset attachments w/o intent', function () {
    $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson('/api/trainset-attachments')
        ->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation',
                    'destination_workstation',
                    'project',
                    'trainset',
                    'type',
                    'qr_code',
                    'qr_path',
                    'status',
                    'elapsed_time',
                    'supervisor_id',
                    'trainset_attachment_id',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('index returns paginated trainset attachments get attachments', function () {
    $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson('/api/trainset-attachments', [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value
    ])->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation',
                    'destination_workstation',
                    'project',
                    'trainset',
                    'type',
                    'qr_code',
                    'qr_path',
                    'status',
                    'elapsed_time',
                    'supervisor_id',
                    'trainset_attachment_id',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('index returns trainset attachments get attachments by status', function () {
    $this->dummy->createTrainsetAttachment(['status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value]);
    actAsSuperAdmin()->getJson('http://127.0.0.1/api/trainset-attachments', [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS->value,
        'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value
    ])->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation',
                    'destination_workstation',
                    'project',
                    'trainset',
                    'type',
                    'qr_code',
                    'qr_path',
                    'status',
                    'elapsed_time',
                    'supervisor_id',
                    'trainset_attachment_id',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('index returns trainset attachments by current user', function () {
    $supervisor = $this->dummy->createSupervisorMekanik();
    $this->dummy->createTrainsetAttachment(['supervisor_id' => $supervisor->id]);
    $this->actingAs($supervisor)->getJson('/api/trainset-attachments', [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER->value
    ])->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation',
                    'destination_workstation',
                    'project',
                    'trainset',
                    'type',
                    'qr_code',
                    'qr_path',
                    'status',
                    'elapsed_time',
                    'supervisor_id',
                    'trainset_attachment_id',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('index returns trainset attachments by status and current user', function () {
    $supervisor = $this->dummy->createSupervisorMekanik();
    $this->dummy->createTrainsetAttachment([
        'supervisor_id' => $supervisor->id,
        'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value
    ]);
    $this->actingAs($supervisor)->getJson('http://127.0.0.1/api/trainset-attachments', [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER->value,
        'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value
    ])->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation',
                    'destination_workstation',
                    'project',
                    'trainset',
                    'type',
                    'qr_code',
                    'qr_path',
                    'status',
                    'elapsed_time',
                    'supervisor_id',
                    'trainset_attachment_id',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('store creates new trainset attachment', function () {
    $trainset = $this->dummy->createTrainset();
    $sourceWorkstation = $this->dummy->createWorkstation();
    $destinationWorkstation = $this->dummy->createWorkstation();

    actAsSuperAdmin()->postJson('/api/trainset-attachments', [
        'trainset_id' => $trainset->id,
        'source_workstation_id' => $sourceWorkstation->id,
        'destination_workstation_id' => $destinationWorkstation->id,
        'type' => TrainsetAttachmentTypeEnum::MECHANIC->value,
        'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value,
    ])
        ->assertStatus(201)
        ->assertJsonStructure(['id', 'trainset_id', 'source_workstation_id', 'destination_workstation_id', 'type', 'status']);
});

test('show returns trainset attachment details', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson("/api/trainset-attachments/{$trainsetAttachment->id}?intent=" . IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value)
        ->assertStatus(200)
        ->assertJson([
            'attachment_number' => $trainsetAttachment->attachment_number,
            'type' => $trainsetAttachment->type->value,
            'qr_code' => $trainsetAttachment->qr_code,
            'qr_path' => $trainsetAttachment->qr_path,
            'status' => $trainsetAttachment->status->value,
            'elapsed_time' => $trainsetAttachment->elapsed_time,
            'trainset_attachment_id' => $trainsetAttachment->trainset_attachment_id,
            'created_at' => $trainsetAttachment->created_at->toDateTimeString(),
            'updated_at' => $trainsetAttachment->updated_at->toDateTimeString(),
        ]);
});

test('show returns trainset attachment materials', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson("/api/trainset-attachments/{$trainsetAttachment->id}?intent=" . IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value)
        ->assertStatus(200)
        ->assertJsonStructure(['attachment_number', 'total_materials', 'materials']);
});

test('show returns trainset attachment components', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson("/api/trainset-attachments/{$trainsetAttachment->id}?intent=" . IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS->value)
        ->assertStatus(200)
        ->assertJsonStructure(['attachment_number', 'components']);
});

test('show returns trainset attachment progress', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->getJson("/api/trainset-attachments/{$trainsetAttachment->id}?intent=" . IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value)
        ->assertStatus(200)
        ->assertJsonStructure(['attachment_number', 'total_components', 'trainset_components']);
});

test('update assigns worker to trainset attachment', function () {
    $supervisor = $this->dummy->createSupervisorMekanik();
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    $worker = $this->dummy->createWorkerMekanik();
    $component = $this->dummy->createTrainsetAttachmentComponent(['trainset_attachment_id' => $trainsetAttachment->id]);

    $this->actingAs($supervisor)->putJson("/api/trainset-attachments/{$trainsetAttachment->id}", [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_ASSIGN_WORKER->value,
        'worker_id' => $worker->id,
        'carriage_panel_component_id' => $component->carriage_panel_component_id,
    ])
        ->assertStatus(200)
        ->assertJsonStructure(['id', 'worker_id', 'trainset_attachment_component_id']);
});

test('update confirms KPM by supervisor', function () {
    $supervisor = $this->dummy->createSupervisorMekanik();
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();

    $this->actingAs($supervisor)->putJson("/api/trainset-attachments/{$trainsetAttachment->id}", [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV->value,
        'status' => TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value,
    ])
        ->assertStatus(200)
        ->assertJsonPath('status', TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value);
});

test('update assigns supervisor and receiver', function () {
    $supervisor = $this->dummy->createSupervisorMekanik();
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    $receiver = $this->dummy->createWorkerMekanik();

    $this->actingAs($supervisor)->putJson("/api/trainset-attachments/{$trainsetAttachment->id}", [
        'intent' => IntentEnum::API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value,
        'supervisor_id' => $supervisor->id,
        'receiver_id' => $receiver->id,
    ])
        ->assertStatus(200)
        ->assertJsonStructure(['id', 'supervisor_id', 'trainset_attachment_handlers']);
});

test('destroy deletes trainset attachment', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    actAsSuperAdmin()->deleteJson("/api/trainset-attachments/{$trainsetAttachment->id}")
        ->assertStatus(200);
    $this->assertDatabaseMissing('trainset_attachments', ['id' => $trainsetAttachment->id]);
});
