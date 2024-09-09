<?php


test('view all work day times', function () {
    createWorkDayTime();
    actAsSuperAdmin()->get('/api/work-day-times')->assertStatus(200);
});

test('view work day time', function () {
    $workDayTime = createWorkDayTime();
    actAsSuperAdmin()->get('/api/work-day-times/' . $workDayTime->id)->assertStatus(200);
});

test('store work day time', function () {
    $workDay = createWorkDay();
    actAsSuperAdmin()->post('/api/work-day-times', [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
    ])->assertStatus(201);

    $this->assertDatabaseHas('work_day_times', [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
    ]);
});

test('update work day time', function () {
    $workDay = createWorkDay();
    $workDayTime = createWorkDayTime();
    actAsSuperAdmin()->put('/api/work-day-times/' . $workDayTime->id, [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
    ])->assertStatus(200);

    $this->assertDatabaseHas('work_day_times', [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
    ]);
});

test('destroy work day time', function () {
    $workDayTime = createWorkDayTime();
    actAsSuperAdmin()->delete('/api/work-day-times/' . $workDayTime->id)->assertStatus(200);

    $this->assertDatabaseMissing('work_day_times', [
        'id' => $workDayTime->id,
    ]);
});
