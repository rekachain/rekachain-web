<?php

use App\Http\Resources\WorkDayTimeResource;

test('view all work-days', function () {
    $this->dummy->createWorkDay();
    actAsSuperAdmin()->get('/api/work-days')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'day',
                    'created_at',
                    'updated_at',
                    'can_be_deleted',
                    'start_time',
                    'end_time',
                ]
            ],
            'meta'
        ]);
});

test('view work-day', function () {
    $workday = $this->dummy->createWorkDay();
    actAsSuperAdmin()->get('/api/work-days/' . $workday->id)->assertStatus(200)
        ->assertJson([
            'id' => $workday->id,
            'day' => $workday->day,
            'created_at' => $workday->created_at->toDateTimeString(),
            'updated_at' => $workday->updated_at->toDateTimeString(),
            'can_be_deleted' => $workday->canBeDeleted(),
            'start_time' => $workday->work_day_times->min('start_time'),
            'end_time' => $workday->work_day_times->max('end_time'),
        ]);
});

test('store work-day', function () {
    actAsSuperAdmin()->post('/api/work-days', [
        'day' => 'Test Day',
    ])->assertStatus(201);

    $this->assertDatabaseHas('work_days', [
        'day' => 'Test Day',
    ]);
});

test('update work-day', function () {
    $workday = $this->dummy->createWorkDay();
    actAsSuperAdmin()->put('/api/work-days/' . $workday->id, [
        'day' => 'Test Day',
    ])->assertStatus(200);

    $this->assertDatabaseHas('work_days', [
        'id' => $workday->id,
        'day' => 'Test Day',
    ]);
});

test('destroy work-day', function () {
    $workday = $this->dummy->createWorkDay();
    actAsSuperAdmin()->delete('/api/work-days/' . $workday->id)->assertStatus(200);
    $this->assertDatabaseMissing('work_days', [
        'id' => $workday->id,
    ]);
});
