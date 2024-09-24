<!-- route not ready -->
<?php

use App\Models\Carriage;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated detail-worker-panels', function () {
    $user = User::factory()->superAdmin()->create();
    Carriage::factory()->count(15)->create();

    $response = $this->actingAs($user)->getJson('/detail-worker-panels?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(10, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/detail-worker-panels/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Carriage/Create'));
});

test('store method creates new carriage', function () {
    $user = User::factory()->superAdmin()->create();
    $carriageData = [
        'type' => 'Test Type',
        'description' => 'Test Description',
    ];

    $response = $this->actingAs($user)->postJson('/detail-worker-panels', $carriageData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'type', 'description']);
    $this->assertDatabaseHas('detail-worker-panels', $carriageData);
});

// test('store method imports detail-worker-panels', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('detail-worker-panels.xlsx');

//     $response = $this->actingAs($user)->postJson('/detail-worker-panels', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns carriage details', function () {
    $user = User::factory()->superAdmin()->create();
    $carriage = Carriage::factory()->create();

    $response = $this->actingAs($user)->getJson("/detail-worker-panels/{$carriage->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $carriage->id, 'type' => $carriage->type]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $carriage = Carriage::factory()->create();

    $response = $this->actingAs($user)->get("/detail-worker-panels/{$carriage->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Carriage/Edit'));
});

test('update method updates carriage', function () {
    $user = User::factory()->superAdmin()->create();
    $carriage = Carriage::factory()->create();
    $updatedData = [
        'type' => 'Updated Type',
        'description' => 'Updated Description',
    ];

    $response = $this->actingAs($user)->putJson("/detail-worker-panels/{$carriage->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('detail-worker-panels', $updatedData);
});

test('destroy method deletes carriage', function () {
    $user = User::factory()->superAdmin()->create();
    $carriage = Carriage::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/detail-worker-panels/{$carriage->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('detail-worker-panels', ['id' => $carriage->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->getJson('/detail-worker-panels?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

    $response->assertStatus(200)
        ->assertDownload('detail-worker-panels_template.xlsx');
});

