<?php

use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Models\Workstation;
use App\Support\Enums\IntentEnum;

beforeEach(fn() => createSupervisorAssembly());

test('view all panelAttachment', function () {
    createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments')->assertStatus(200);
});

test('show one panelAttachment', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value)->assertStatus(200);
});

test('show one panelAttachment with QR', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value . '&qr_code=' . $panelAttachment->qr_code)->assertStatus(200);
});

test('show one panelAttachment with invalid QR', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value . '&qr_code=' . $panelAttachment->qr_code . '123132')->assertStatus(400);
});

test('show one panelAttachment with SN', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value)->assertStatus(200);
});

// THE REST IS PENDING

test('store panelAttachment', function () {
    createCarriagePanel();
    createCarriageTrainset();
    createWorkstation();
    createWorkstation();
    actAsSuperAdmin()->post('/api/panel-attachments', [
        'carriage_trainset_id' => CarriageTrainset::inRandomOrder()->first()->id,
        'carriage_panel_id' => CarriagePanel::inRandomOrder()->first()->id,
        'source_workstation_id' => Workstation::inRandomOrder()->first()->id,
        'destination_workstation_id' => Workstation::inRandomOrder()->first()->id,
        'attachment_number' => 1,
        'qr_code' => 'test qr',
        'qr_path' => 'test qr',
        'current_step' => 'test step',
        'elapsed_time' => 1,
        'status' => 'active',
        'panel_attachment_id' => null,
        'supervisor_id' => null,
    ])->assertStatus(200);
});

test('update panelAttachment', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->put('/api/panel-attachments/' . $panelAttachment->id, [
        'status' => 'active',
    ])->assertStatus(200);
});

test('destroy panelAttachment', function () {
    $panelAttachment = createPanelAttachment();
    actAsSuperAdmin()->delete('/api/panel-attachments/' . $panelAttachment->id)->assertStatus(200);
});
