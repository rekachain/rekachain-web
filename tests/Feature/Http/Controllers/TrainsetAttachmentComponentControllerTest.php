<?php

test('index return trainset attachment components', function () {
    $this->dummy->createTrainsetAttachmentComponent();
    $response = actAsSuperAdmin()->getJson('/trainset-attachment-components');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'trainset_attachment_id',
                    'carriage_panel_component_id',
                    'total_required',
                    'total_fulfilled',
                    'total_failed',
                    'created_at',
                    'updated_at',
                ]
            ],
            'meta'
        ])
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachmentComponent/Index'));
});

test('create return trainset attachment component create page', function () {
    $response = actAsSuperAdmin()->get('/trainset-attachment-components/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachmentComponent/Create'));
});

test('store trainset attachment component', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();

    $response = actAsSuperAdmin()->postJson('/trainset-attachment-components', [
        'trainset_attachment_id' => $trainsetAttachment->id,
        'carriage_panel_component_id' => $carriagePanelComponent->id,
        'total_required' => 10,
        'total_fulfilled' => 5,
        'total_failed' => 5
    ]);

    $response->assertStatus(201);
});

test('show return detail trainset attachment component page', function () {
    $trainsetAttachmentComponent = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->getJson('/trainset-attachment-components/' . $trainsetAttachmentComponent->id);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment_id',
            'carriage_panel_component_id',
            'total_required',
            'total_fulfilled',
            'total_failed',
            'created_at',
            'updated_at',
        ])
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachmentComponent/Show'));
});

test('edit return trainset attachment component edit page', function () {
    $trainsetAttachmentComponent = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->getJson('/trainset-attachment-components/' . $trainsetAttachmentComponent->id . '/edit');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment_id',
            'carriage_panel_component_id',
            'total_required',
            'total_fulfilled',
            'total_failed',
            'created_at',
            'updated_at',
        ])
        ->assertInertia(fn ($assert) => $assert->component('TrainsetAttachmentComponent/Edit'));
});

test('update trainset attachment component', function () {
    $trainsetAttachmentComponent = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->putJson('/trainset-attachment-components/' . $trainsetAttachmentComponent->id, [
        'trainset_attachment_id' => $trainsetAttachmentComponent->trainset_attachment_id,
        'carriage_panel_component_id' => $trainsetAttachmentComponent->carriage_panel_component_id,
        'total_required' => 10,
        'total_fulfilled' => 5,
        'total_failed' => 5
    ]);

    $response->assertStatus(200);
});

test('destroy trainset attachment components', function () {
    $trainsetAttachmentComponent = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->deleteJson('/trainset-attachment-components/' . $trainsetAttachmentComponent->id);

    $response->assertStatus(204);
});
