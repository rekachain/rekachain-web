
<?php

use App\Models\Role;
use App\Models\Step;
use App\Models\User;
use App\Models\SerialPanel;
use App\Models\ProgressStep;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use App\Models\TrainsetAttachment;
use App\Models\DetailWorkerTrainset;
use Illuminate\Support\Facades\Storage;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

test('index method returns paginated detail-worker-trainsets', function () {
    $user = User::factory()->superAdmin()->create();
    $detail = createDetailWorkerTrainset();

    $response = $this->actingAs($user)->getJson('/detail-worker-trainsets?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// Not ready
// test('create method returns create page', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/test/detail-worker-trainsets/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerTrainset/Create'));
// });

test('store method creates new DetailWorkerTrainset', function () {
    $user = User::factory()->superAdmin()->create();

    $role = Role::firstOrCreate(['name' => 'Supervisor - Mekanik', 'guard_name' => 'web']);
    $userMekanik = User::factory(['name' => 'Supervisor - Mekanik'])->create();
    $userMekanik->assignRole($role);

    $progress_step = createProgressStep();
    $trainset_attachment = createTrainsetAttachment();

    $DetailWorkerTrainsetData = [
        'trainset_attachment_id' => $trainset_attachment->id,
        'worker_id' => $user->id,
        'progress_step_id' => $progress_step->id,
        'estimated_time' => 7,
        'work_status' => 'in_progress',
        'acceptance_status' => 'accepted'
    ];

    $response = $this->actingAs($user)->postJson('/detail-worker-trainsets', $DetailWorkerTrainsetData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'trainset_attachment_id', 'worker_id', 'progress_step_id', 'estimated_time', 'work_status', 'acceptance_status']);
    $this->assertDatabaseHas('detail_worker_trainsets', $DetailWorkerTrainsetData);
});

// test('store method imports detail-worker-trainsets', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('detail-worker-trainsets.xlsx');

//     $response = $this->actingAs($user)->postJson('/test/detail-worker-trainsets', [
//         'intent' => IntentEnum::WEB_DetailWorkerTrainset_IMPORT_DetailWorkerTrainset->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns DetailWorkerTrainset details', function () {
    $user = User::factory()->superAdmin()->create();
    $detailWorkerTrainset = createDetailWorkerTrainset();

    $response = $this->actingAs($user)->getJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $detailWorkerTrainset->id,
            'trainset_attachment_id' => $detailWorkerTrainset->trainset_attachment_id,
            'worker_id' => $detailWorkerTrainset->worker_id,
            'progress_step_id' => $detailWorkerTrainset->progress_step_id,
            'estimated_time' => $detailWorkerTrainset->estimated_time,
            'work_status' => $detailWorkerTrainset->work_status->value,
            'acceptance_status' => $detailWorkerTrainset->acceptance_status->value,
        ]);
});

// Not ready
// test('edit method returns edit page', function () {
//     $user = User::factory()->superAdmin()->create();
//     $DetailWorkerTrainset = createDetailWorkerTrainset();

//     $response = $this->actingAs($user)->get("/detail-worker-trainsets/{$DetailWorkerTrainset->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('DetailWorkerTrainset/Edit'));
// });

test('update method updates DetailWorkerTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $detailWorkerTrainset = createDetailWorkerTrainset();
    $updatedData = [
        'estimated_time' => 35,
    ];

    $response = $this->actingAs($user)->putJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('detail_worker_trainsets', $updatedData);
});

test('destroy method deletes DetailWorkerTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $detailWorkerTrainset = createDetailWorkerTrainset();

    $response = $this->actingAs($user)->deleteJson("/detail-worker-trainsets/{$detailWorkerTrainset->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('detail_worker_trainsets', ['id' => $detailWorkerTrainset->id]);
});

// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/detail-worker-trainsets?intent=' . IntentEnum::WEB_DetailWorkerTrainset_GET_TEMPLATE_IMPORT_DetailWorkerTrainset->value);

//     $response->assertStatus(200)
//         ->assertDownload('detail-worker-trainsets_template.xlsx');
// });

