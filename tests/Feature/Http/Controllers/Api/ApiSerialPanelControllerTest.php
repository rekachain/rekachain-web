<?php

use App\Support\Enums\IntentEnum;

test('show SN detail', function () {
    $this->dummy->createSupervisorAssembly();
    $serial_panel = $this->dummy->createSerialPanel();
    actAsSuperAdmin()->get('/api/serial-panels/' . $serial_panel->id . '?intent=' . IntentEnum::API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value)->assertStatus(200);
});
