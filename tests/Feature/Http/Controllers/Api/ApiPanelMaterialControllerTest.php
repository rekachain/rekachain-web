<?php

test('view all Panel Material', function () {
    actAsSuperAdmin()->get('/api/panel-materials')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'carriage_panel_id',
                    'panel_material_id',
                    'qty',
                ],
            ],
            'message',
        ]);
});

test('store Panel Material', function () {
    $carriage_panel = $this->dummy->createCarriagePanel();
    $raw_material = $this->dummy->createRawMaterial();

    actAsSuperAdmin()->post('/api/panel-materials', [
        'carriage_panel_id' => $carriage_panel->id,
        'raw_material_id' => $raw_material->id,
        'qty' => 1,
    ])->assertStatus(201);

    $this->assertDatabaseHas('panel_materials', [
        'carriage_panel_id' => $carriage_panel->id,
        'raw_material_id' => $raw_material->id,
        'qty' => 1,
    ]);
});

test('show Panel Material', function () {
    $panel_material = $this->dummy->createPanelMaterial();

    actAsSuperAdmin()->get('/api/panel-materials/' . $panel_material->id)->assertStatus(200)
        ->assertJson([
            'id' => $panel_material->id,
            'carriage_panel_id' => $panel_material->carriage_panel_id,
            'qty' => $panel_material->qty,
        ]);
});

test('update Panel Material', function () {
    $panel_material = $this->dummy->createPanelMaterial();
    $carriage_panel = $this->dummy->createCarriagePanel();

    actAsSuperAdmin()->put('/api/panel-materials/' . $panel_material->id, [
        'carriage_panel_id' => $carriage_panel->id,
        'qty' => 1,
    ])->assertStatus(200);

    $this->assertDatabaseHas('panel_materials', [
        'carriage_panel_id' => $carriage_panel->id,
        'qty' => 1,
    ]);
});

