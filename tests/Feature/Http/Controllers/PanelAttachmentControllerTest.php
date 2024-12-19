<?php

use App\Support\Enums\IntentEnum;

beforeEach( function () {
    $this->dummy->createSupervisorAssembly();
});

test('get all panel attachment', function () {
    $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'attachment_number',
                    'source_workstation_id',
                    'destination_workstation_id',
                    'carriage_panel_id',
                    'qr_code',
                    'qr_path',
                    'qr',
                    'serial_numbers',
                    // 'current_step',
                    'elapsed_time',
                    'status',
                    'panel_attachment_id',
                    'supervisor_id',
                    'created_at',
                    'updated_at',
                    'formatted_created_at',
                    'formatted_updated_at',
                    'is_ancestor',
                    'is_parent',
                    'is_child'
                ],
            ],
        ]);
});

test('show panel attachment get panel', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL->value);
    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'progress_id',
            'name',
            'description',
            'created_at',
            'updated_at',
        ]);
});

test('show panel attachment get panel with qty', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY->value);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'panel' => [
                'id',
                'progress_id',
                'name',
                'description',
                'created_at',
                'updated_at',
            ],
            'total_qty',
        ]);
});

test('show panel attachment get serial panels', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_SERIAL_PANELS->value);

    $response->assertStatus(200);
});

test('show panel attachment get attachment progress', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS->value);

    $response->assertStatus(200);
});

test('show panel attachment get panel materials', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS->value);
    
    $response->assertStatus(200);
});

test('show panel attachment get panel materials with qty', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY->value);

    $response->assertStatus(200);
});

test('show panel attachment', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->getJson('/panel-attachments/' . $panelAttachment->id);

    $response->assertStatus(200);
});

test('update panel attachment assign referenced attachment', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->putJson('/panel-attachments/' . $panelAttachment->id, [
        'referenced_attachment_id' => $panelAttachment->id,
    ]);

    $response->assertStatus(200);
});

test('update panel attachment assign custom attachment material', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    $response = actAsSuperAdmin()->putJson('/panel-attachments/' . $panelAttachment->id, [
        'custom_attachment_material_id' => $panelAttachment->id,
    ]);

    $response->assertStatus(200);
});
