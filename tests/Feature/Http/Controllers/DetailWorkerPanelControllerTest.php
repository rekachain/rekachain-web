<!-- route not ready -->
<?php

// use App\Models\Step;
// use App\Models\User;
// use App\Models\SerialPanel;
// use App\Models\DetailWorkerPanel;
// use App\Support\Enums\IntentEnum;
// use Illuminate\Http\UploadedFile;
// use Illuminate\Support\Facades\Storage;
// use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
// use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

// test('index method returns paginated detail-worker-panels', function () {
//     $user = User::factory()->superAdmin()->create();
//     createDetailWorkerPanel();

//     $response = $this->actingAs($user)->getJson('/detail-worker-panels?page=1&perPage=10');

//     $response->assertStatus(200)
//         ->assertJsonStructure(['data', 'meta'])
//         ->assertJsonCount(1, 'data');
// });

// // Not ready
// // test('create method returns create page', function () {
// //     $user = User::factory()->superAdmin()->create();

// //     $response = $this->actingAs($user)->get('/detail-worker-panels/create');

// //     $response->assertStatus(200)
// //         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerPanel/Create'));
// // });

// test('store method creates new DetailWorkerPanel', function () {
//     $user = User::factory()->superAdmin()->create();
//     User::factory()->create();
//     createSerialPanel();
//     createProgressStep();
//     $DetailWorkerPanelData = [
//         'serial_panel_id' => SerialPanel::inRandomOrder()->first()->id,
//         'worker_id' => User::inRandomOrder()->first()->id,
//         'progress_step_id' => Step::inRandomOrder()->first()->id,
//         'estimated_time' => 40,
//         'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
//         'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
//     ];

//     $response = $this->actingAs($user)->postJson('/detail-worker-panels', $DetailWorkerPanelData);

//     $response->assertStatus(201)
//         ->assertJsonStructure(['id', 'serial_panel_id', 'worker_id', 'progress_step_id', 'estimated_time', 'work_status', 'acceptance_status']);
//     $this->assertDatabaseHas('detail_worker_panels', $DetailWorkerPanelData);
// });

// // test('store method imports detail-worker-panels', function () {
// //     Storage::fake('local');
// //     $user = User::factory()->superAdmin()->create();
// //     $file = UploadedFile::fake()->create('detail-worker-panels.xlsx');

// //     $response = $this->actingAs($user)->postJson('/detail-worker-panels', [
// //         'intent' => IntentEnum::WEB_DetailWorkerPanel_IMPORT_DetailWorkerPanel->value,
// //         'import_file' => $file,
// //     ]);

// //     $response->assertStatus(204);
// // });

// test('show method returns DetailWorkerPanel details', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerPanel = DetailWorkerPanel::factory()->create();

//     $response = $this->actingAs($user)->getJson("/detail-worker-panels/{$DetailWorkerPanel->id}");

//     $response->assertStatus(200)
//         ->assertJson(['id' => $DetailWorkerPanel->id, 'type' => $DetailWorkerPanel->type]);
// });

// // Not ready
// // test('edit method returns edit page', function () {
// //     $user = User::factory()->superAdmin()->create();
// //     $DetailWorkerPanel = DetailWorkerPanel::factory()->create();

// //     $response = $this->actingAs($user)->get("/detail-worker-panels/{$DetailWorkerPanel->id}/edit");

// //     $response->assertStatus(200)
// //         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerPanel/Edit'));
// // });

// test('update method updates DetailWorkerPanel', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerPanel = DetailWorkerPanel::factory()->create();
//     $updatedData = [
//         'estimated_time' => 35,
//     ];

//     $response = $this->actingAs($user)->putJson("/detail-worker-panels/{$DetailWorkerPanel->id}", $updatedData);

//     $response->assertStatus(200)
//         ->assertJson($updatedData);
//     $this->assertDatabaseHas('detail_worker_panels', $updatedData);
// });

// test('destroy method deletes DetailWorkerPanel', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerPanel = DetailWorkerPanel::factory()->create();

//     $response = $this->actingAs($user)->deleteJson("/detail-worker-panels/{$DetailWorkerPanel->id}");

//     $response->assertStatus(200);
//     $this->assertDatabaseMissing('detail_worker_panels', ['id' => $DetailWorkerPanel->id]);
// });

// // test('index method returns import template', function () {
// //     $user = User::factory()->superAdmin()->create();

// //     $response = $this->actingAs($user)->getJson('/detail-worker-panels?intent=' . IntentEnum::WEB_DetailWorkerPanel_GET_TEMPLATE_IMPORT_DetailWorkerPanel->value);

// //     $response->assertStatus(200)
// //         ->assertDownload('detail-worker-panels_template.xlsx');
// // });

