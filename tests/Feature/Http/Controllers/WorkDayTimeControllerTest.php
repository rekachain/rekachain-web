<?php

use App\Models\User;
use App\Models\WorkDay;
use App\Models\WorkDayTime;

test('index method returns paginated work-day-times', function () {
    $user = User::factory()->create();
    WorkDay::factory()->count(5)->create();
    WorkDayTime::factory()->count(15)->create();

    $response = $this->actingAs($user)->getJson('/work-day-times?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

// test('create method returns create page', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->get('/work-day-times/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDayTime/Create'));
// });

test('store method creates new workDayTime', function () {
    $user = User::factory()->create();
    $workDay = createWorkDay();
    $workDayTimeData = [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '10:00',
        'status' => 'break',
    ];

    $response = $this->actingAs($user)->postJson('/work-day-times', $workDayTimeData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'work_day_id', 'start_time', 'end_time', 'status']);
    $this->assertDatabaseHas('work_day_times', $workDayTimeData);
});

// NOT IMPLEMENTED
// test('store method imports work-day-times', function () {
//     Storage::fake('local');
//     $user = User::factory()->create();
//     $file = UploadedFile::fake()->create('work-day-times.xlsx');

//     $response = $this->actingAs($user)->postJson('/work-day-times', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns workDayTime details', function () {
    $user = User::factory()->create();
    $workDayTime = createWorkDayTime();

    $response = $this->actingAs($user)->getJson("/work-day-times/{$workDayTime->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $workDayTime->id,
            'start_time' => $workDayTime->start_time,
            'end_time' => $workDayTime->end_time,
            'status' => $workDayTime->status,
        ]);
});

// test('edit method returns edit page', function () {
//     $user = User::factory()->create();
//     $workDayTime = WorkDayTime::factory()->create();

//     $response = $this->actingAs($user)->get("/work-day-times/{$workDayTime->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('WorkDayTime/Edit'));
// });

test('update method updates workDayTime', function () {
    $user = User::factory()->create();
    $workDayTime = createWorkDayTime();
    $updatedData = [
        'work_day_id' => $workDayTime->work_day_id,
        'start_time' => '09:00',
        'end_time' => '10:00',
        'status' => 'break',
    ];

    $response = $this->actingAs($user)->putJson("/work-day-times/{$workDayTime->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson([
            'id' => $workDayTime->id,
            'work_day_id' => $workDayTime->work_day_id,
            'start_time' => $updatedData['start_time'] . ':00',
            'end_time' => $updatedData['end_time'] . ':00',
            'status' => $updatedData['status'],
        ]);
    // $this->assertDatabaseHas('work_day_times', $updatedData);
});

test('destroy method deletes workDayTime', function () {
    $user = User::factory()->create();
    $workDayTime = createWorkDayTime();

    $response = $this->actingAs($user)->deleteJson("/work-day-times/{$workDayTime->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('work_day_times', ['id' => $workDayTime->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->getJson('/work-day-times?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('work-day-times_template.xlsx');
// });
