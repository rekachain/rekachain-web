<?php

beforeEach(function () {
    $this->dummy->createSupervisorMekanik();
});

test('get index', function() {
    $trainsetAttachmentHandler = $this->dummy->createTrainsetAttachmentHandler();
    $response = actAsSuperAdmin()->get('/api/trainset-attachment-handlers?trainset_attachment_id=' . $trainsetAttachmentHandler->trainset_attachment_id);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'user_id',
                    'handler_name',
                    'trainset_attachment_id',
                    'handles',
                ]
            ]
            ])
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $trainsetAttachmentHandler->id);
});

