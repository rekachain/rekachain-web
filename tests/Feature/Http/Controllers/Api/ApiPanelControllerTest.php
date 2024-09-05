<?php


test('view all panels', function () {
    createPanel();
    actAsSuperAdmin()->get('/api/panels')->assertStatus(200);
});

test('show one panel', function () {
    $panel = createPanel();
    actAsSuperAdmin()->get('/api/panels/' . $panel->id)->assertStatus(200);
});

test('update one panel', function () {
    $panel = createPanel();
    actAsSuperAdmin()->put('/api/panels/' . $panel->id, [
        'name' => 'Panel Updated',
    ])->assertStatus(200);

    $this->assertDatabaseHas('panels', [
        'id' => $panel->id,
        'name' => 'Panel Updated',
    ]);
});

test('store one panel', function () {
    actAsSuperAdmin()->post('/api/panels', [
        'name' => 'Panel',
    ])->assertStatus(201);

    $this->assertDatabaseHas('panels', [
        'name' => 'Panel',
    ]);
});
