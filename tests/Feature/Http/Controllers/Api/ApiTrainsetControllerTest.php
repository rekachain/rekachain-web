<?php

test('view all trainsets', function () {
    $this->dummy->createTrainset();
    actAsSuperAdmin()->get('/api/trainsets')->assertStatus(200);
});

test('view one trainset', function () {
    $trainset = $this->dummy->createTrainset();
    actAsSuperAdmin()->get('/api/trainsets/' . $trainset->id)->assertStatus(200);
});

test('store trainset', function () {
    $project = $this->dummy->createProject();
    actAsSuperAdmin()->post('/api/trainsets', [
        'name' => 'test',
        'project_id' => $project->id,
    ])->assertStatus(201);
});

test('edit trainset', function () {
    $trainset = $this->dummy->createTrainset();
    actAsSuperAdmin()->put('/api/trainsets/' . $trainset->id, [
        'name' => 'test',
    ])->assertStatus(200);

    $this->assertDatabaseHas('trainsets', [
        'id' => $trainset->id,
        'name' => 'test',
    ]);
});

// NOT IMPLEMENTED YET
// test('destroy trainset', function () {
//     $trainset = $this->dummy->createTrainset();
//     actAsSuperAdmin()->delete('/api/trainsets/' . $trainset->id)->assertStatus(200);

//     $this->assertDatabaseMissing('trainsets', [
//         'id' => $trainset->id,
//     ]);
// });
