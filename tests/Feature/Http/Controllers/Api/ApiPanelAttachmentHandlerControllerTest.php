<?php

use App\Models\PanelAttachmentHandler;
use App\Models\User;

test('index method returns panel attachment handlers for given panel attachment id', function () {
    User::factory()->create();
    $this->dummy->createSupervisorAssembly();
    $panelAttachment = $this->dummy->createPanelAttachment();
    $panelAttachmentHandlers = PanelAttachmentHandler::factory()->create([
        'panel_attachment_id' => $panelAttachment->id,
    ]);

    $response = actAsSuperAdmin()->get('/api/panel-attachment-handlers?panel_attachment_id=' . $panelAttachment->id);

    $response->assertStatus(200);
});
