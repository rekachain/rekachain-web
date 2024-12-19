<?php

use App\Models\Role;
use App\Models\Step;
use App\Models\User;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;

test('show panel attachment serial number detail', function () {
    $this->dummy->createSupervisorAssembly();
    $serial_panel = $this->dummy->createSerialPanel();
    actAsSuperAdmin()->get('/api/serial-panels/' . $serial_panel->id)->assertStatus(200)
        ->assertJson([
            'serial_number' => $serial_panel->id,
            'project' => $serial_panel->panel_attachment?->carriage_panel->carriage_trainset->trainset->project->name,
            'trainset' => $serial_panel->panel_attachment?->carriage_panel->carriage_trainset->trainset->name,
            'carriage' => $serial_panel->panel_attachment?->carriage_panel->carriage_trainset->carriage->type,
            'panel' => $serial_panel->panel_attachment?->carriage_panel->panel->name,
            'manufacture_status' => $serial_panel->manufacture_status->value,
            'notes' => $serial_panel->notes,
        ]);
});

test('update panel manufacture status failed', function () {
    $user = $this->dummy->createSupervisorAssembly();
    $serial_panel = $this->dummy->createSerialPanel();
    $response =  $this->actingAs($user)->putJson('/api/serial-panels/' . $serial_panel->id . '?intent=' . IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value, [
        'manufacture_status' => SerialPanelManufactureStatusEnum::FAILED->value,
        'notes' => 'hilang',
    ])->assertStatus(200);
});

test('update panel manufacture status completed', function () {
    $user = $this->dummy->createSupervisorAssembly();
    $serial_panel = $this->dummy->createSerialPanel();
    $response =  $this->actingAs($user)->putJson('/api/serial-panels/' . $serial_panel->id . '?intent=' . IntentEnum::API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS->value, [
        'manufacture_status' => SerialPanelManufactureStatusEnum::COMPLETED->value,
    ])->assertStatus(200);
});

test('update assign worker panel', function () {
    $user = $this->dummy->createSupervisorAssembly();
    $serialPanel = $this->dummy->createSerialPanel();

    $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_MEKANIK]);
    $workerAssembly = User::factory(['name' => 'Worker Mekanik', 'step_id' => Step::first()])->create();
    $workerAssembly->assignRole($role);

    $response =  $this->actingAs($user)->putJson('/api/serial-panels/' . $serialPanel->id . '?intent=' . IntentEnum::API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL->value, [
        'worker_id' => $workerAssembly->id
    ])->assertStatus(201)
        ->assertJsonStructure([
            'id',
            'serial_panel_id',
            'worker_id',
            'progress_step_id',
            'estimated_time',
            'image_path',
            'work_status',
            'acceptance_status',
            'created_at',
            'updated_at',
        ]);
});

test('update serial panel', function () {
    $user = $this->dummy->createSupervisorAssembly();
    $serialPanel = $this->dummy->createSerialPanel();
    $panelAttachment = $this->dummy->createPanelAttachment();


    $updatedSerialPanel = [
        'panel_attachment_id' => $panelAttachment->id,
        'qr_code' => $panelAttachment->qr_code,
        'qr_path'=> $panelAttachment->qr_path,
        'manufacture_status' => SerialPanelManufactureStatusEnum::IN_PROGRESS->value
    ];

    $response =  $this->actingAs($user)->putJson('/api/serial-panels/' . $serialPanel->id, $updatedSerialPanel)->assertStatus(200)
        ->assertJson($updatedSerialPanel);
});
// test('update worker panel', function () {
//     $serial_panel = $this->dummy->createSerialPanel();

//     actAsSuperAdmin()->putJson('/api/serial-panels/' . $serial_panel->id . '?intent=' . IntentEnum::API_SERIAL_PANEL_UPDATE_WORKER_PANEL->value, [
//         'worker_id' = $this->user()->id
//     ]);
// });
