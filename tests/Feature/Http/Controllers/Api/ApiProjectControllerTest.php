<?php

test('view all projects', function () {
    $this->dummy->createProject();
    actAsSuperAdmin()->get('/api/projects')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'initial_date',
                    'trainset_count',
                    'created_at',
                    'updated_at',
                    'can_be_deleted',
                ]
            ],
            'meta'
        ]);
});

test('show one project', function () {
    $project = $this->dummy->createProject();
    actAsSuperAdmin()->get('/api/projects/' . $project->id)->assertStatus(200)
        ->assertJson([
            'id' => $project->id,
            'name' => $project->name,
            'initial_date' => $project->initial_date
        ]);
});

test('store project', function () {
    actAsSuperAdmin()->post('/api/projects', [
        'name' => 'Test Project',
        'initial_date' => '2023-01-01',
        'trainset_needed' => 7,
    ])->assertStatus(201);

    $this->assertDatabaseHas('projects', [
        'name' => 'Test Project',
        'initial_date' => '2023-01-01',
    ]);
});

test('update project', function () {
    $project = $this->dummy->createProject();
    actAsSuperAdmin()->put('/api/projects/' . $project->id, [
        'name' => 'Test update project',
    ])->assertStatus(200);

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Test update project',
    ]);
});

// NOT IMPLEMENTED
// test('destroy project', function () {
//     $project = $this->dummy->createProject();
//     actAsSuperAdmin()->delete('/api/projects/' . $project->id)->assertStatus(200);
// });
