<?php

use App\Models\User;
use App\Models\PanelAttachmentHandler;

test('index method returns panel attachment handlers for given panel attachment id', function () {
    User::factory()->create();
    $panelAttachment = createPanelAttachment();
    $panelAttachmentHandlers = PanelAttachmentHandler::factory()->create([
        'panel_attachment_id' => $panelAttachment->id
    ]);

    $response = actAsSuperAdmin()->get('/api/panel-attachment-handlers?panel_attachment_id=' . $panelAttachment->id);

    $response->assertStatus(200);
});

