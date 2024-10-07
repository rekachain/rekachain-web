<?php

test('view all Panel Material', function () {
    actAsSuperAdmin()->get('/api/panel-materials')->assertStatus(200);
});

test('store Panel Material', function () {
    $carriage_panel = createCarriagePanel();
    $raw_material = createRawMaterial();
    actAsSuperAdmin()->post('/api/panel-materials', [
        'carriage_panel_id' => $carriage_panel->id,
        'panel_material_id' => $raw_material->id,
        'qty' => 1,
    ])->assertStatus(201);
});

test('update Panel Material', function () {
    $carriage_panel = createCarriagePanel();
    $raw_material = createRawMaterial();
    $panel_material = createPanelMaterial();
    // dump($carriage_panel->id);
    // dump($raw_material->id);
    // dump($panel_material->id);
    actAsSuperAdmin()->put('/api/panel-materials/' . $panel_material->id, [
        'carriage_panel_id' => $carriage_panel->id,
        'panel_material_id' => $raw_material->id,
        'qty' => 1,
    ])->assertStatus(200);
});

// test('destroy Panel Material', function () {
//     $carriage_panel = createCarriagePanel();
//     $raw_material = createRawMaterial();
//     actAsSuperAdmin()->delete('/api/panel-materials', [
//         'carriage_panel_id' => $carriage_panel->id,
//         'panel_material_id' => $raw_material->id,
//         'qty' => 1,
//     ])->assertStatus(200);
// });

test('show one Panel Material', function () {
    $panel_material = createPanelMaterial();
    actAsSuperAdmin()->get('/api/panel-materials/' . $panel_material->id)->assertStatus(200);
});
