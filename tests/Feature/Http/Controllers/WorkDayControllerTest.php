<?php

use App\Models\User;
use App\Models\WorkDay;

test('index method returns paginated work-days', function () {
    $user = User::factory()->create();
    WorkDay::factory()->count(5)->create();

    $response = $this->actingAs($user)->getJson('/work-days?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->get('/work-days/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDay/Create'));
// });

test('store method creates new workDay', function () {
    $user = User::factory()->create();
    $workDayData = [
        'day' => 'Test day',
    ];

    $response = $this->actingAs($user)->postJson('/work-days', $workDayData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'day']);
    $this->assertDatabaseHas('work_days', $workDayData);
});

// NOT IMPLEMENTED
// test('store method imports work-days', function () {
//     Storage::fake('local');
//     $user = User::factory()->create();
//     $file = UploadedFile::fake()->create('work-days.xlsx');

//     $response = $this->actingAs($user)->postJson('/work-days', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns workDay details', function () {
    $user = User::factory()->create();
    $workDay = WorkDay::factory()->create();

    $response = $this->actingAs($user)->getJson("/work-days/{$workDay->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $workDay->id, 'day' => $workDay->day]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->create();
//     $workDay = WorkDay::factory()->create();

//     $response = $this->actingAs($user)->get("/work-days/{$workDay->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDay/Edit'));
// });

test('update method updates workDay', function () {
    $user = User::factory()->create();
    $workDay = WorkDay::factory()->create();
    $updatedData = [
        'day' => 'Updated Day',
    ];

    $response = $this->actingAs($user)->putJson("/work-days/{$workDay->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('work_days', $updatedData);
});

test('destroy method deletes workDay', function () {
    $user = User::factory()->create();
    $workDay = WorkDay::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/work-days/{$workDay->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('work_days', ['id' => $workDay->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->getJson('/work-days?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('work-days_template.xlsx');
// });
