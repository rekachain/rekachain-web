<?php

use App\Models\TrainsetAttachment;
use App\Support\Enums\TrainsetAttachmentTypeEnum;

beforeEach(function () {
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createSupervisorAssembly();
    $this->dummy->createSupervisorElektrik();
});

test('index method returns paginated trainset attachments', function () {
    $this->dummy->createTrainsetAttachment();
    $response = actAsSuperAdmin()->getJson('/trainset-attachments?page=1&perPage=1');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    actAsSuperAdmin()->get('/trainset-attachments/create')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachment/Create'));
});

test('store method creates new trainset attachment', function () {
    $trainset = $this->dummy->createTrainset();
    $sourceWorkstation = $this->dummy->createWorkstation();
    $destinationWorkstation = $this->dummy->createWorkstation();

    $attachmentData = [
        'trainset_id' => $trainset->id,
        'source_workstation_id' => $sourceWorkstation->id,
        'destination_workstation_id' => $destinationWorkstation->id,
        'attachment_number' => 'TA001',
        'type' => TrainsetAttachmentTypeEnum::MECHANIC,
        'qr_code' => 'qr_code_001',
        'qr_path' => 'path/to/qr/001',
        'status' => 'pending',
    ];

    $response = actAsSuperAdmin()->postJson('/trainset-attachments', $attachmentData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'attachment_number', 'trainset_id', 'source_workstation_id', 'destination_workstation_id']);
    $this->assertDatabaseHas('trainset_attachments', $attachmentData);
});

test('show method returns trainset attachment details', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();

    $response = actAsSuperAdmin()->getJson("/trainset-attachments/{$trainsetAttachment->id}");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'attachment_number', 'trainset_id', 'source_workstation_id', 'destination_workstation_id']);
});

test('edit method returns edit page', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();

    $response = actAsSuperAdmin()->get("/trainset-attachments/{$trainsetAttachment->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachment/Edit'));
});

test('update method updates trainset attachment', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    $newDestinationWorkstation = $this->dummy->createWorkstation();

    $updatedData = [
        'destination_workstation_id' => $newDestinationWorkstation->id,
        'status' => 'in_progress',
    ];

    $response = actAsSuperAdmin()->putJson("/trainset-attachments/{$trainsetAttachment->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'attachment_number', 'destination_workstation_id', 'status']);
    $this->assertDatabaseHas('trainset_attachments', $updatedData);
});

test('destroy method deletes trainset attachment', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();

    $response = actAsSuperAdmin()->deleteJson("/trainset-attachments/{$trainsetAttachment->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('trainset_attachments', ['id' => $trainsetAttachment->id]);
});
