<?php

use App\Models\User;
use App\Models\SerialPanel;
use App\Models\ProgressStep;
use App\Support\Enums\RoleEnum;
use App\Models\DetailWorkerPanel;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

beforeEach(function () {

    $this->dummy->createSupervisorAssembly();
    $this->dummy->createWorkerAssembly();
});

test('view all detail-worker-panels w/o intent', function () {

    DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();
    actAsSuperAdmin()->get('/api/detail-worker-panels')->assertStatus(200);
});

test('view all detail-worker-panels intent by status in progress', function () {

    DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();
    $status = DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value;
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200);
});

test('view all detail-worker-panels intent by status completed', function () {

    DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();
    $status = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
    actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value . '&work_status=' . $status)->assertStatus(200);
});

test('view all detail-worker-panels intent by current user', function () {

    $user = User::factory()->create();
    DetailWorkerPanel::where(['worker_id' => $user->id]) ?? $this->dummy->createDetailWorkerPanel(['worker_id' => $user->id]);

    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_CURRENT_USER->value);

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta']);
});

test('view all detail-worker-panels intent by status and current user', function () {

    $user = User::factory()->create();
    $status = DetailWorkerPanelWorkStatusEnum::cases()[array_rand(DetailWorkerPanelWorkStatusEnum::cases())]->value;
    DetailWorkerPanel::where(['worker_id' => $user->id, 'work_status' => $status]) ?? $this->dummy->createDetailWorkerPanel(['worker_id' => $user->id, 'work_status' => $status]);

    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER->value . '&work_status=' . $status);

    $response->assertStatus(200);
});

test('view all detail-worker-panels intent get all request worker', function () {

    $supervisor = $this->dummy->createSupervisorAssembly();
    DetailWorkerPanel::inRandomOrder()->first() ??  $this->dummy->createDetailWorkerPanel();

    $response = $this->actingAs($supervisor)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER->value . '&acceptance_status=all');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta']);
});

test('view all detail-worker-panels intent get all request worker with pending status', function () {

    $supervisor = $this->dummy->createSupervisorAssembly();
    DetailWorkerPanel::where(['acceptance_status' => null]) ?? $this->dummy->createDetailWorkerPanel(['acceptance_status' => null]);

    $response = $this->actingAs($supervisor)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER->value . '&acceptance_status=pending');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'links', 'meta']);
});

test('store detail-worker-panel', function () {

    $worker =  User::where(['name' => 'Assembly'])->first();
    $serial_panel = SerialPanel::inRandomOrder()->first();
    $DetailWorkerPanelData = [
        'serial_panel_id' => $serial_panel->id,
    ];

    $response = $this->actingAs($worker)->postJson('/api/detail-worker-panels', $DetailWorkerPanelData);

    $response->assertStatus(201);
});

test('store detail-worker-panel fails for non-worker role', function () {

    $user = User::factory()->create();
    $serial_panel = SerialPanel::inRandomOrder()->first() ?? $this->dummy->createSerialPanel();
    $progress_step = ProgressStep::inRandomOrder()->first() ?? $this->dummy->createProgressStep();
    $DetailWorkerPanelData = [
        'serial_panel_id' => $serial_panel->id,
        'worker_id' => $user->id,
        'progress_step_id' => $progress_step->id,
    ];

    $response = $this->actingAs($user)->postJson('/api/detail-worker-panels', $DetailWorkerPanelData);

    $response->assertStatus(403);
});

test('show detail-worker-panel with get panel details intent', function () {

    $user = User::factory()->create();
    $detailWorkerPanel = DetailWorkerPanel::where(['worker_id' => $user->id])->first() ?? $this->dummy->createDetailWorkerPanel(['worker_id' => $user->id]);

    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels/' . $detailWorkerPanel->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS->value);

    $response->assertStatus(200)
        ->assertJsonStructure(['data']);
});

test('update method updates DetailWorkerPanel for assign request worker', function () {

    $supervisor = $this->dummy->createSupervisorAssembly();
    $DetailWorkerPanel = DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();

    $response = $this->actingAs($supervisor)->putJson('/api/detail-worker-panels/' . $DetailWorkerPanel->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER->value);

    $response->assertStatus(200);
});

test('update method fails for non-supervisor role', function () {

    $user = User::factory()->create();
    $DetailWorkerPanel = DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();

    $response = $this->actingAs($user)->putJson('/api/detail-worker-panels/' . $DetailWorkerPanel->id . '?intent=' . IntentEnum::API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER->value);

    $response->assertStatus(403);
});

test('view all detail-worker-panels intent by status fails with invalid status', function () {

    $invalidStatus = 'invalid_status';
    $response = actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value . '&work_status=' . $invalidStatus);

    $response->assertStatus(400);
});

test('view all detail-worker-panels intent by status fails with missing status', function () {

    $response = actAsSuperAdmin()->get('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_BY_STATUS->value);

    $response->assertStatus(400);
});

test('view all detail-worker-panels intent get all request worker fails for non-supervisor role', function () {

    $user = User::factory()->create();
    $response = $this->actingAs($user)->getJson('/api/detail-worker-panels?intent=' . IntentEnum::API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER->value . '&acceptance_status=all');

    $response->assertStatus(403);
});
