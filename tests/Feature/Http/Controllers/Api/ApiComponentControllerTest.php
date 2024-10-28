<?php

test('view all Components', function () {
    $this->dummy->createComponent();
    actAsSuperAdmin()->get('/api/components')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'progress_id',
                    'can_be_deleted',
                    'updated_at',
                ]
            ],
            'meta'
        ]);
});

test('show one Component', function () {
    $component = $this->dummy->createComponent();
    actAsSuperAdmin()->get('/api/components/' . $component->id)->assertStatus(200)
        ->assertJson([
            'id' => $component->id,
            'name' => $component->name,
            'progress_id' => $component->progress_id,
        ]);
});

test('store component', function () {
    $progress = $this->dummy->createProgress();
    $componentData = [
        'name' => 'Test Component',
        'progress_id' => $progress->id
    ];

    actAsSuperAdmin()->post('/api/components', $componentData)->assertStatus(201)
        ->assertJsonStructure([
            'id',
            'name',
            'progress_id',
            'progress',
            'can_be_deleted',
            'updated_at',
        ]);

    $this->assertDatabaseHas('components', $componentData);
});

test('update component', function () {
    $component = $this->dummy->createComponent();
    $updatedComponentData = [
        'name' => 'Test Component',
    ];

    actAsSuperAdmin()->put('/api/components/' . $component->id, $updatedComponentData)->assertStatus(200);

    $this->assertDatabaseHas('components', $updatedComponentData);
});

// NOT IMPLEMENTED
// test('destroy component', function () {

//     $component = $this->dummy->createComponent();
//     actAsSuperAdmin()->delete('/api/components/' . $component->id)->assertStatus(200);
// });
