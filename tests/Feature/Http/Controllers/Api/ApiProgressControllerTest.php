<?php

test('view all progress', function () {
    createProgress();
    actAsSuperAdmin()->get('/api/progress')->assertStatus(200);
});

test('view one progress', function () {
    $progress = createProgress();
    actAsSuperAdmin()->get('/api/progress/' . $progress->id)->assertStatus(200);
});

test('store one progress', function () {
    actAsSuperAdmin()->post('/api/progress', [
        'name' => 'Test Progress',
    ])->assertStatus(201);

    $this->assertDatabaseHas('progress', [
        'name' => 'Test Progress',
    ]);
});

test('update one progress', function () {
    $progress = createProgress();
    actAsSuperAdmin()->put('/api/progress/' . $progress->id, [
        'name' => 'Test Progress Updated',
    ])->assertStatus(200);

    $this->assertDatabaseHas('progress', [
        'name' => 'Test Progress Updated',
    ]);
});
// NOT IMPLEMENTED YET
// test('destroy one progress', function () {
//     $progress = createProgress();
//     actAsSuperAdmin()->delete('/api/progress/' . $progress->id)->assertStatus(204);

//     $this->assertDatabaseMissing('progress', [
//         'id' => $progress->id,
//     ]);
// });
