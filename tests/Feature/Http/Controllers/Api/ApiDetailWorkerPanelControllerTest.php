<?php

use App\Models\User;
use App\Models\SerialPanel;
use App\Models\ProgressStep;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

beforeEach(function () {
    createSupervisorAssembly();
    createWorkerAssembly();
});

test('view all detail-worker-panels w/o intent', function () {
    createDetailWorkerPanel();
    actAsSuperAdmin()->get('/api/detail-worker-panels')->assertStatus(200);
});

test('view all detail-worker-panels intent by process', function () {
    createDetailWorkerPanel();
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_PROCESS->value)->assertStatus(200);
});

test('view all detail-worker-panels intent by done', function () {
    createDetailWorkerPanel();
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_DONE->value)->assertStatus(200);
});

test('store detail-worker-panel', function () {
    $user = User::factory()->superAdmin()->create();
    $worker = User::factory()->create();
    $serial_panel = createSerialPanel();
    $progress_step = createProgressStep();
    $DetailWorkerPanelData = [
        'serial_panel_id' => $serial_panel->id,
        'worker_id' => $worker->id,
        'progress_step_id' => $progress_step->id,
        'estimated_time' => 40,
        'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
        'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
    ];

    $response = $this->actingAs($user)->postJson('/api/detail-worker-panels', $DetailWorkerPanelData);

    $response->assertStatus(200);
});

test('update method updates DetailWorkerPanel accepted', function () {
    $user = User::factory()->superAdmin()->create();
    $DetailWorkerPanel = createDetailWorkerPanel();

    $response = $this->actingAs($user)->putJson('/api/detail-worker-panels/' . $DetailWorkerPanel->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_ACCEPT_ASSIGN_WORKER->value);

    $response->assertStatus(200);
});

test('update method updates DetailWorkerPanel declined', function () {
    $user = User::factory()->superAdmin()->create();
    $DetailWorkerPanel = createDetailWorkerPanel();

    $response = $this->actingAs($user)->putJson('/api/detail-worker-panels/' . $DetailWorkerPanel->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_DECLINE_ASSIGN_WORKER->value);

    $response->assertStatus(200);
});

// test('destroy method deletes DetailWorkerPanel', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerPanel = createDetailWorkerPanel();

//     $response = $this->actingAs($user)->deleteJson("/api/detail-worker-panels/{$DetailWorkerPanel->id}");

//     $response->assertStatus(200);
//     $this->assertDatabaseMissing('detail_worker_panels', ['id' => $DetailWorkerPanel->id]);
// });

