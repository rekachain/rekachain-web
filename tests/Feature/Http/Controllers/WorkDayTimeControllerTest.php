<?php

use App\Models\User;
use App\Models\WorkDay;
use App\Models\WorkDayTime;
use App\Support\Enums\WorkDayTimeEnum;

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();
    $workDay = WorkDay::factory()->create();

    $response = $this->actingAs($user)->get("/work-days/{$workDay->id}/work-day-times/create");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('WorkDay/WorkDayTime/Create'));
});

test('store method creates new work day time', function () {
    $user = User::factory()->superAdmin()->create();
    $workDay = WorkDay::factory()->create();
    $workDayTimeData = [
        'start_time' => '08:00',
        'end_time' => '17:00',
        'status' => WorkDayTimeEnum::WORK->value,
        '_token' => 'test-token'
    ];

    $response = $this->actingAs($user)
        ->withSession(['_token' => 'test-token'])
        ->postJson("/work-days/{$workDay->id}/work-day-times", $workDayTimeData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'work_day_id', 'start_time', 'end_time', 'status']);
});


test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $workDay = WorkDay::factory()->create();
    $workDayTime = WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);

    $response = $this->actingAs($user)->get("/work-days/{$workDay->id}/work-day-times/{$workDayTime->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('WorkDay/WorkDayTime/Edit'));
});

test('update method updates work day time', function () {
    $user = User::factory()->superAdmin()->create();
    $workDay = WorkDay::factory()->create();
    $workDayTime = WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);
    $updatedData = [
        'start_time' => '12:00',
        'end_time' => '13:00',
        'status' => WorkDayTimeEnum::BREAK->value,
        '_token' => 'test-token'
    ];

    $response = $this->actingAs($user)
        ->withSession(['_token' => 'test-token'])
        ->putJson("/work-days/{$workDay->id}/work-day-times/{$workDayTime->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'work_day_id', 'start_time', 'end_time', 'status']);
});

test('destroy method deletes work day time', function () {
    $user = User::factory()->superAdmin()->create();
    $workDay = WorkDay::factory()->create();
    $workDayTime = WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);

    $response = $this->actingAs($user)
        ->withSession(['_token' => 'test-token'])
        ->deleteJson("/work-days/{$workDay->id}/work-day-times/{$workDayTime->id}", [
            '_token' => 'test-token'
        ]);

    $response->assertStatus(200);
    $this->assertDatabaseMissing('work_day_times', ['id' => $workDayTime->id]);
});


// test('destroy method deletes work day time', function () {
//     $user = User::factory()->superAdmin()->create();
//     $workDay = WorkDay::factory()->create();
//     $workDayTime = WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);

//     // $response = $this->actingAs($user)->deleteJson("/work-days/{$workDay->id}/work-day-times/{$workDayTime->id}");
//     $response = $this->actingAs($user)
//     ->withToken('test-token')
//     ->deleteJson("/work-days/{$workDay->id}/work-day-times/{$workDayTime->id}");

//     $response->assertStatus(200);
//     $this->assertDatabaseMissing('work_day_times', ['id' => $workDayTime->id]);
// });
