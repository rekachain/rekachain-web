<?php

use App\Models\Workstation;
use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Support\Enums\IntentEnum;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TrainsetResource;
use App\Http\Resources\SerialPanelResource;
use App\Http\Resources\WorkstationResource;
use App\Http\Resources\CarriagePanelResource;
use App\Http\Resources\AttachmentNoteResource;
use App\Http\Resources\CarriageTrainsetResource;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Http\Resources\PanelAttachmentHandlerResource;

beforeEach(fn() => $this->dummy->createSupervisorAssembly());

test('index view panelAttachment w/o intent', function () {
    $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->getJson('/api/panel-attachments')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'project',
                    'trainset',
                    'carriage',
                    'panel',
                    'qr_code',
                    'qr_path',
                    'status',
                    'supervisor_id',
                    'supervisor_name',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('index view panelAttachment by status', function () {
    $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('http://127.0.0.1:8000/api/panel-attachments', [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS->value,
        'status' => PanelAttachmentStatusEnum::IN_PROGRESS->value,
    ])->assertStatus(200)
    ->assertJsonStructure([
        'data' => [
            '*' => [
                'id',
                'attachment_number',
                'project',
                'trainset',
                'carriage',
                'panel',
                'qr_code',
                'qr_path',
                'status',
                'supervisor_id',
                'supervisor_name',
                'created_at',
                'updated_at',
            ]
        ],
        'meta'
    ]);
});

test('index view panelAttachment by current user', function () {
    $user = $this->dummy->createWorkerAssembly();
    $detailWorkerPanel = $this->dummy->createDetailWorkerPanel();

    $this->actingAs($user)->getJson('http://127.0.0.1:8000/api/panel-attachments', [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER->value,
    ])->assertStatus(200)
    ->assertJsonStructure([
        'data' => [
            '*' => [
                'id',
                'attachment_number',
                'project',
                'trainset',
                'carriage',
                'panel',
                'qr_code',
                'qr_path',
                'status',
                'supervisor_id',
                'supervisor_name',
                'created_at',
                'updated_at',
            ]
        ],
        'meta'
    ]);
});

test('index view panelAttachment by status and current user', function () {
    $user = $this->dummy->createWorkerAssembly();
    $detailWorkerPanel = $this->dummy->createDetailWorkerPanel();

    $this->actingAs($user)->getJson('http://127.0.0.1:8000/api/panel-attachments', [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER->value,
        'status' => PanelAttachmentStatusEnum::DONE->value,
    ])->assertStatus(200)
    ->assertJsonStructure([
        'data' => [
            '*' => [
                'id',
                'attachment_number',
                'project',
                'trainset',
                'carriage',
                'panel',
                'qr_code',
                'qr_path',
                'status',
                'supervisor_id',
                'supervisor_name',
                'created_at',
                'updated_at',
            ]
        ],
        'meta'
    ]);
});

test('show one panelAttachment w/o intent', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id)->assertStatus(200)
        ->assertJson([
            'id' => $panelAttachment->id,
            'attachment_number' => $panelAttachment->attachment_number,
            'source_workstation_id' => $panelAttachment->source_workstation_id,
            'destination_workstation_id' => $panelAttachment->destination_workstation_id,
            'carriage_panel_id' => $panelAttachment->carriage_panel_id,
            'qr_code' => $panelAttachment->qr_code,
            'qr_path' => $panelAttachment->qr_path,
            'elapsed_time' => $panelAttachment->elapsed_time,
            'status' => $panelAttachment->status->value,
            'panel_attachment_id' => $panelAttachment->panel_attachment_id,
            'supervisor_id' => $panelAttachment->supervisor_id,
        ]);
});

test('show one panelAttachment get attachment details', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value)->assertStatus(200)
        ->assertJsonStructure([
            'id', 'attachment_number', 'project', 'trainset', 'carriage_trainset', 'carriage_panel', 'source_workstation', 'destination_workstation', 'qr_code', 'qr_path', 'current_step', 'elapsed_time', 'status', 'supervisor', 'panel_attachment_handlers', 'serial_panels', 'attachment_notes', 'created_at', 'updated_at',
        ]);
});

test('show one panelAttachment get attachment materials', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS->value)->assertStatus(200)
        ->assertJsonStructure([
            'attachment_number', 'total_materials', 'materials',
        ]);
});

test('show one panelAttachment get attachment details with QR', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value . '&qr_code=' . $panelAttachment->qr_code)->assertStatus(200)
        ->assertJsonStructure([
            'id', 'attachment_number', 'project', 'trainset', 'carriage_trainset', 'carriage_panel', 'source_workstation', 'destination_workstation', 'qr_code', 'qr_path', 'current_step', 'elapsed_time', 'status', 'supervisor', 'panel_attachment_handlers', 'serial_panels', 'attachment_notes', 'created_at', 'updated_at',
        ]);
});

test('show one panelAttachment get attachment serial number', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value)->assertStatus(200)
        ->assertJsonStructure([
            '*' => [
                'id',
                'serial_number',
                'progress',
                'total_steps',
                'steps',
            ],
        ]);
});


test('show one panelAttachment get attachment serial number with QR', function () { #broken
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($supervisor)->get('/api/panel-attachments/' . $panelAttachment->id . '?intent' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR->value)->assertStatus(200);

        // ->assertJsonStructure([
        //     'serial_number', 'project', 'trainset', 'carriage', 'panel', 'manufacture_status', 'notes', 'created_at', 'updated_at',
        // ]);
});


// THE REST IS PENDING

test('update panel attachment confirm kpm by spv', function() {
    $user = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($user)->put('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id, [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV->value,
        'status' => PanelAttachmentStatusEnum::DONE->value,
    ])->assertStatus(200)
        ->assertJson([
            'id' => $panelAttachment->id,
            'status' => PanelAttachmentStatusEnum::DONE->value,
        ]);
});

test('update panel attachment update attachment status', function() {
    $user = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($user)->put('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id, [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS->value,
        'status' => PanelAttachmentStatusEnum::PENDING->value,
        'note' => 'test note',
    ])->assertStatus(200)
        ->assertJson([
            'id' => "$panelAttachment->id",
            'status' => PanelAttachmentStatusEnum::PENDING->value,
        ]);
});

test('update panel attachment reject kpm', function() {
    $user = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($user)->put('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id, [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_REJECT_KPM->value,
    ])->assertStatus(200)
        ->assertJson([
            'id' => "$panelAttachment->id",
            'status' => PanelAttachmentStatusEnum::PENDING->value,
        ]);
});

test('update panel attachment update assign spv and receiver', function() {
    $user = $this->dummy->createSupervisorAssembly();
    $receiver = $this->dummy->createWorkerAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();

    $response = $this->actingAs($user)->put('http://127.0.0.1:8000/api/panel-attachments/' . $panelAttachment->id, [
        'intent' => IntentEnum::API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER->value,
        'receiver_id' => $receiver->id
    ])->assertStatus(200)
        ->assertJson([
            'id' => "$panelAttachment->id",
            'status' => PanelAttachmentStatusEnum::IN_PROGRESS->value,
        ]);
});

test('update panelAttachment w/o intent', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $status = PanelAttachmentStatusEnum::cases()[array_rand(PanelAttachmentStatusEnum::cases())]->value;
    actAsSuperAdmin()->put('/api/panel-attachments/' . $panelAttachment->id, [
        'status' => $status,
        'note' => 'test notes',
    ])->assertStatus(200)
        ->assertJson([
            'id' => $panelAttachment->id,
            'status' => $status,
        ]);
});
