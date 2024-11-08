<!-- API TRAINSET ATTACHMENT COMPONENT ROUTE NOT SET -->
<?php

use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\IntentEnum;

beforeEach(function () {
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createSupervisorElektrik();
});

test('index method returns paginated trainset attachment components', function () {
    $this->dummy->createTrainsetAttachmentComponent();
    $response = actAsSuperAdmin()->getJson('/api/trainset-attachment-components?page=1&perPage=5');

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
        ]);
});

test('store method creates new trainset attachment component', function () {
    $trainsetAttachment = $this->dummy->createTrainsetAttachment();
    $carriagePanelComponent = $this->dummy->createCarriagePanelComponent();

    $componentData = [
        'trainset_attachment_id' => $trainsetAttachment->id,
        'carriage_panel_component_id' => $carriagePanelComponent->id,
        'total_required' => 5,
        'total_fulfilled' => 0,
        'total_failed' => 0,
    ];

    $response = actAsSuperAdmin()->postJson('/api/trainset-attachment-components', $componentData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'trainset_attachment_id', 'carriage_panel_component_id', 'total_required']);
    $this->assertDatabaseHas('trainset_attachment_components', $componentData);
});

test('show method returns trainset attachment component details', function () {
    $component = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->getJson("/api/trainset-attachment-components/{$component->id}");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'trainset_attachment_id', 'carriage_panel_component_id', 'total_required', 'total_fulfilled', 'total_failed']);
});

test('update method updates trainset attachment component', function () {
    $component = $this->dummy->createTrainsetAttachmentComponent();
    $updatedData = [
        'total_fulfilled' => 3,
        'total_failed' => 1,
    ];

    $response = actAsSuperAdmin()->putJson("/api/trainset-attachment-components/{$component->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'total_fulfilled', 'total_failed']);
    $this->assertDatabaseHas('trainset_attachment_components', $updatedData);
});

test('destroy method deletes trainset attachment component', function () {
    $component = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->deleteJson("/api/trainset-attachment-components/{$component->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('trainset_attachment_components', ['id' => $component->id]);
});

test('get component details', function () {
    $component = $this->dummy->createTrainsetAttachmentComponent();

    $response = actAsSuperAdmin()->getJson("/api/trainset-attachment-components/{$component->id}?intent=" . IntentEnum::API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS->value);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'trainset_attachment',
            'carriage_panel_component',
            'total_required',
            'total_fulfilled',
            'total_failed',
            'detail_worker_trainset'
        ]);
});
