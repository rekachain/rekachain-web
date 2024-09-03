<?php

test('view all projects', function () {
    createProject();
    actAsSuperAdmin()->get('/api/projects')->assertStatus(200);
});

test('show one project', function () {
    $project = createProject();
    actAsSuperAdmin()->get('/api/projects/' . $project->id)->assertStatus(200);
});

test('store project', function () {
    actAsSuperAdmin()->post('/api/projects', [
        'name' => 'Project',
        'initial_date' => '2023-01-01',
        'trainset_needed' => 7,
    ])->assertStatus(201);
});

test('update project', function () {
    $project = createProject();
    actAsSuperAdmin()->put('/api/projects/' . $project->id, [
        'name' => 'Project',
    ])->assertStatus(200);
});

test('destroy project', function () {
    $project = createProject();
    actAsSuperAdmin()->delete('/api/projects/' . $project->id)->assertStatus(200);
});
