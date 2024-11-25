<?php

test('view all work day times', function () {
    $this->dummy->createWorkDayTime();
    actAsSuperAdmin()->get('/api/work-day-times')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'day',
                    'start_time',
                    'end_time',
                    'status',
                ]
            ],
            'meta'
        ]);
});

test('view work day time', function () {
    $workDayTime = $this->dummy->createWorkDayTime();
    actAsSuperAdmin()->get('/api/work-day-times/' . $workDayTime->id)->assertStatus(200)
        ->assertJson([
            'id' => $workDayTime->id,
            'day' => $workDayTime->work_day->day,
            'start_time' => $workDayTime->start_time,
            'end_time' => $workDayTime->end_time,
            'status' => $workDayTime->status->value,
        ]);
});

test('store work day time', function () {
    $workDay = $this->dummy->createWorkDay();
    actAsSuperAdmin()->post('/api/work-day-times', [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
        'api' => true,
    ])->assertStatus(201);

    $this->assertDatabaseHas('work_day_times', [
        'work_day_id' => $workDay->id,
        'start_time' => '09:00',
        'end_time' => '09:30',
        'status' => 'work',
    ]);
});

test('update work day time', function () {
    $workDay = $this->dummy->createWorkDay();
    $workDayTime = $this->dummy->createWorkDayTime();
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
    $workDayTime = $this->dummy->createWorkDayTime();
    actAsSuperAdmin()->delete('/api/work-day-times/' . $workDayTime->id)->assertStatus(200);

    $this->assertDatabaseMissing('work_day_times', [
        'id' => $workDayTime->id,
    ]);
});
