<?php

test('view all panels', function () {
    $this->dummy->createPanel();
    actAsSuperAdmin()->get('/api/panels')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'progress_id',
                    'name',
                    'can_be_deleted',
                    'created_at',
                    'updated_at',
                ],
            ],
            'meta',
        ]);
});

test('show one panel', function () {
    $panel = $this->dummy->createPanel();
    actAsSuperAdmin()->get('/api/panels/' . $panel->id)->assertStatus(200)
        ->assertJson([
            'id' => $panel->id,
            'progress_id' => $panel->progress_id,
            'name' => $panel->name,
            'description' => $panel->description,
        ]);
});

test('update one panel', function () {
    $panel = $this->dummy->createPanel();
    $updatedPanel = [
        'name' => 'Panel Updated',
        'description' => 'Panel Description Updated'
    ];
    actAsSuperAdmin()->put('/api/panels/' . $panel->id, $updatedPanel)->assertStatus(200);

    $this->assertDatabaseHas('panels', $updatedPanel);
});

test('store one panel', function () {
    $progress = $this->dummy->createProgress();

    $panelData = [
        'progress_id' => $progress->id,
        'name' => 'Test Panel',
        'description' => 'Test Panel Description',
    ];

    actAsSuperAdmin()->post('/api/panels', $panelData)->assertStatus(201);

    $this->assertDatabaseHas('panels', $panelData);
});

// NOT IMPLEMENTED YET
// test('destroy one panel', function () {
//     $panel = $this->dummy->createPanel();
//     actAsSuperAdmin()->delete('/api/panels/' . $panel->id)->assertStatus(200);
//     $this->assertDatabaseMissing('panels', [
//         'id' => $panel->id,
//     ]);
// });
