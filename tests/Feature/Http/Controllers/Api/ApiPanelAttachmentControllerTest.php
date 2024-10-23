<?php

use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Models\Workstation;
use App\Support\Enums\IntentEnum;

beforeEach(fn() => $this->dummy->createSupervisorAssembly());

test('view all panelAttachment', function () {
    $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments')->assertStatus(200);
});

test('show one panelAttachment', function () {
    $supervisor = $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();
    
    $response = $this->actingAs($supervisor)->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS->value)->assertStatus(200);
});

test('show one panelAttachment with QR', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value . '&qr_code=' . $panelAttachment->qr_code)->assertStatus(200);
});

test('show one panelAttachment with invalid QR', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value . '&qr_code=' . $panelAttachment->qr_code . '123132')->assertStatus(400);
});

test('show one panelAttachment with SN', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->get('/api/panel-attachments/' . $panelAttachment->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value)->assertStatus(200);
});

// THE REST IS PENDING

test('store panelAttachment', function () {
    $carriagePanel = $this->dummy->createCarriagePanel();
    $carriageTrainset = $this->dummy->createCarriageTrainset();
    $sourceWorkstation = $this->dummy->createWorkstation();
    $destinationWorkstation = $this->dummy->createWorkstation();
    actAsSuperAdmin()->post('/api/panel-attachments', [
        'carriage_trainset_id' => $carriageTrainset->id,
        'carriage_panel_id' => $carriagePanel->id,
        'source_workstation_id' => $sourceWorkstation->id,
        'destination_workstation_id' => $destinationWorkstation->id,
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
    $panelAttachment = $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->put('/api/panel-attachments/' . $panelAttachment->id, [
        'status' => 'active',
    ])->assertStatus(200);
});

test('destroy panelAttachment', function () {
    $panelAttachment = $this->dummy->createPanelAttachment();
    actAsSuperAdmin()->delete('/api/panel-attachments/' . $panelAttachment->id)->assertStatus(200);
});
