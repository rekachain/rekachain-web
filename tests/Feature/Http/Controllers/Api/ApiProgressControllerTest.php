<?php

test('view all progress', function () {
    $this->dummy->createProgress();
    actAsSuperAdmin()->get('/api/progress')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'created_at',
                    'updated_at',
                ],
            ],
            'meta',
        ]);
});

test('view one progress', function () {
    $progress = $this->dummy->createProgress();
    actAsSuperAdmin()->get('/api/progress/' . $progress->id)->assertStatus(200)
        ->assertJson([
            'id' => $progress->id,
            'name' => $progress->name,
        ]);
});

test('store one progress', function () {
    $workAspect = $this->dummy->createWorkAspect();

    $progressData = [
        'name' => 'Test Progress',
        'work_aspect_id' => $workAspect->id,
    ];

    actAsSuperAdmin()->post('/api/progress', $progressData)->assertStatus(201);

    $this->assertDatabaseHas('progress', $progressData);
});

test('update one progress', function () {
    $progress = $this->dummy->createProgress();
    $workAspect = $this->dummy->createWorkAspect();
    actAsSuperAdmin()->put('/api/progress/' . $progress->id, [
        'name' => 'Test Progress Updated',
        'work_aspect_id' => $workAspect->id,
    ])->assertStatus(200);

    $this->assertDatabaseHas('progress', [
        'name' => 'Test Progress Updated',
        'work_aspect_id' => $workAspect->id,
    ]);
});
// NOT IMPLEMENTED YET
// test('destroy one progress', function () {
//     $progress = $this->dummy->createProgress();
//     actAsSuperAdmin()->delete('/api/progress/' . $progress->id)->assertStatus(204);

//     $this->assertDatabaseMissing('progress', [
//         'id' => $progress->id,
//     ]);
// });
