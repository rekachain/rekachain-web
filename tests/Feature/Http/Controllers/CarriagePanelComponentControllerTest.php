<?php

use App\Support\Enums\IntentEnum;

test('index return carriage panel component', function () {
    $this->dummy->createCarriagePanelComponent();
    $response = actAsSuperAdmin()->getJson('/carriage-panel-components');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'component_id',
                    'carriage_panel_id',
                    'progress_id',
                    'qty',
                    'created_at',
                    'updated_at',
                ],
            ]
        ]);
});

test('create return panel page', function () {
    $response = actAsSuperAdmin()->get('/carriage-panel-components/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Panel/Create'));
});

test('store carriage panel component', function () {
    $component = $this->dummy->createComponent();
    $progress = $this->dummy->createProgress();
    $carriagePanel = $this->dummy->createCarriagePanel();

    $data = [
        'component_id' => $component->id,
        'progress_id' => $progress->id,
        'carriage_panel_id' => $carriagePanel->id,
        'qty' => 4,
    ];

    $response = actAsSuperAdmin()->postJson('/carriage-panel-components', $data);

    $response->assertStatus(201);
});

test('show carriage panel component', function() {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $response = actAsSuperAdmin()->getJson('/carriage-panel-components/' . $carriagePanelComponent->id);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'component_id',
            'carriage_panel_id',
            'progress_id',
            'qty',
            'created_at',
            'updated_at',
        ]);
});

test('edit carriage panel component', function() {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $response = actAsSuperAdmin()->get('/carriage-panel-components/' . $carriagePanelComponent->id . '/edit');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('CarriagePanelComponent/Edit'));
});

test('update carriage panel component', function () {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $update = [
        'carriage_panel_id' => $this->dummy->createCarriagePanel()->id,
        'component_id' => $this->dummy->createComponent()->id,
        'progress_id' => $this->dummy->createProgress()->id,
        'qty' => 4,
    ];

    $response = actAsSuperAdmin()->putJson('/carriage-panel-components/' . $carriagePanelComponent->id, $update);

    $response->assertStatus(200);
});

test('update carriage panel component add raw material', function () {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $rawMaterial = $this->dummy->createRawMaterial();
    $update = [
        'raw_material_id' => $rawMaterial->id,
        'new_raw_material_code' => $rawMaterial->code,
        'new_raw_material_description' => $rawMaterial->description,
        'new_raw_material_unit' => $rawMaterial->unit,
        'new_raw_material_specs' => $rawMaterial->specs,
        'new_raw_material_qty' => 5,

    ];
    $response = actAsSuperAdmin()->putJson('/carriage-panel-components/' . $carriagePanelComponent->id . '?intent=' . IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL->value, $update);

    $response->assertStatus(200);
});

test('update carriage panel component change progress', function () {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $progress = $this->dummy->createProgress();
    $update = [
        'progress_id' => $progress->id,
        'progress_name' => $progress->name,
        'progress_work_aspect_id' => $progress->work_aspect_id,
    ];

    $response = actAsSuperAdmin()->putJson('/carriage-panel-components/' . $carriagePanelComponent->id . '?intent=' . IntentEnum::WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS->value, $update);

    $response->assertStatus(200);
});

test('destroy carriage panel component', function () {
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();
    $response = actAsSuperAdmin()->deleteJson('/carriage-panel-components/' . $carriagePanelComponent->id);

    $response->assertStatus(200);
});
