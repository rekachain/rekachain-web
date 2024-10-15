<?php

test('view all work-days', function () {
    $this->dummy->createWorkDay();
    actAsSuperAdmin()->get('/api/work-days')->assertStatus(200);
});

test('view work-day', function () {
    $workday = $this->dummy->createWorkDay();
    actAsSuperAdmin()->get('/api/work-days/' . $workday->id)->assertStatus(200);
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
