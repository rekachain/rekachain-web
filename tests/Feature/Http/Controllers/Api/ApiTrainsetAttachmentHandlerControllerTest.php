<?php

beforeEach(function () {
    createSupervisorMekanik();
});

test('get index', function() {
    $trainsetAttachmentHandler = createTrainsetAttachmentHandler();
    $response = actAsSuperAdmin()->get('/api/trainset-attachment-handlers?trainset_attachment_id=' . $trainsetAttachmentHandler->trainset_attachment_id);

    $response->assertStatus(200)
        ->assertJsonStructure(['data'])
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $trainsetAttachmentHandler->id);
});

