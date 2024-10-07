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

test('view all detail-worker-panels intent by status in progress', function () {
    createDetailWorkerPanel();
    $status = DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value;
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200);
});

test('view all detail-worker-panels intent by status completed', function () {
    createDetailWorkerPanel();
    $status = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200);
});

test('view all detail-worker-panels intent by current user', function () {
    $user = User::factory()->create();
    createDetailWorkerPanel(['worker_id' => $user->id]);

    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_CURRENT_USER->value);

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta'])
        ->assertJsonCount(1, 'data');

    $responseData = $response->json('data')[0];
    $this->assertEquals($user->id, $responseData['worker_id']);
});


test('view all detail-worker-panels intent by status and current user', function () {
    $user = User::factory()->create();
    $status = DetailWorkerPanelWorkStatusEnum::cases()[array_rand(DetailWorkerPanelWorkStatusEnum::cases())]->value;
    createDetailWorkerPanel(['worker_id' => $user->id, 'work_status' => $status]);

    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER->value . '&work_status=' . $status);

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta'])
        ->assertJsonCount(1, 'data');

    $responseData = $response->json('data')[0];
    $this->assertEquals($user->id, $responseData['worker_id']);
    $this->assertEquals($status, $responseData['work_status']);
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

