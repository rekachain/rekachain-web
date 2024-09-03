<?php


test('view all Components', function () {
    createComponent();
    actAsSuperAdmin()->get('/api/components')->assertStatus(200);
});

test('show one Component', function () {
    $component = createComponent();
    actAsSuperAdmin()->get('/api/components/' . $component->id)->assertStatus(200);
});

test('store component', function () {
    actAsSuperAdmin()->post('/api/components', [
        'name' => 'Test Component',
    ])->assertStatus(201);
});

test('update component', function () {
    $component = createComponent();
    actAsSuperAdmin()->put('/api/components/' . $component->id, [
        'name' => 'Test Component',
    ])->assertStatus(200);
});

test('destroy component', function () {
    $component = createComponent();
    actAsSuperAdmin()->delete('/api/components/' . $component->id)->assertStatus(200);
});
