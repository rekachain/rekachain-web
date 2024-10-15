<?php

use App\Models\Step;
use App\Models\User;
use App\Models\SerialPanel;
use App\Models\DetailWorkerPanel;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;


beforeEach(function () {
    $this->dummy->createSupervisorAssembly();
    $this->dummy->createWorkerAssembly();
});

test('index method returns paginated detail-worker-panels', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->getJson('/detail-worker-panels?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

// Not ready
// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/detail-worker-panels/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerPanel/Create'));
// });

test('store method creates new DetailWorkerPanel', function () {

    $user = User::factory()->superAdmin()->create();
    $worker = User::factory()->create();
    $serial_panel = $this->dummy->createSerialPanel();
    $progress_step = $this->dummy->createProgressStep();
    $DetailWorkerPanelData = [
        'serial_panel_id' => $serial_panel->id,
        'worker_id' => $worker->id,
        'progress_step_id' => $progress_step->id,
        'estimated_time' => 40,
        'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
        'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
    ];

    $response = $this->actingAs($user)->postJson('/detail-worker-panels', $DetailWorkerPanelData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'serial_panel_id', 'worker_id', 'progress_step_id', 'estimated_time', 'work_status', 'acceptance_status']);
    $this->assertDatabaseHas('detail_worker_panels', $DetailWorkerPanelData);
});

test('show method returns DetailWorkerPanel details', function () {
    $user = User::factory()->superAdmin()->create();
    $DetailWorkerPanel = DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();

    $response = $this->actingAs($user)->getJson("/detail-worker-panels/{$DetailWorkerPanel->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $DetailWorkerPanel->id,
            'serial_panel_id' => $DetailWorkerPanel->serial_panel_id,
            'worker_id' => $DetailWorkerPanel->worker_id,
            'progress_step_id' => $DetailWorkerPanel->progress_step_id,
            'estimated_time' => $DetailWorkerPanel->estimated_time,
            'work_status' => $DetailWorkerPanel->work_status->value,
            'acceptance_status' => $DetailWorkerPanel->acceptance_status->value,
        ]);
});

// Not ready
// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerPanel = $this->dummy->createDetailWorkerPanel();

//     $response = $this->actingAs($user)->get("/detail-worker-panels/{$DetailWorkerPanel->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerPanel/Edit'));
// });

test('update method updates DetailWorkerPanel', function () {
    $user = User::factory()->superAdmin()->create();
    $DetailWorkerPanel = DetailWorkerPanel::inRandomOrder()->first() ?? $this->dummy->createDetailWorkerPanel();
    $updatedData = [
        'estimated_time' => 35,
    ];

    $response = $this->actingAs($user)->putJson("/detail-worker-panels/{$DetailWorkerPanel->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('detail_worker_panels', $updatedData);
});

test('destroy method deletes DetailWorkerPanel', function () {
    $user = User::factory()->superAdmin()->create();
    $DetailWorkerPanel = DetailWorkerPanel::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/detail-worker-panels/{$DetailWorkerPanel->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('detail_worker_panels', ['id' => $DetailWorkerPanel->id]);
});
