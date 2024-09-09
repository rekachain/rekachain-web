<?php


test('view all panel-attachments', function () {
    actAsSuperAdmin()->get('/api/panel-attachments')->assertStatus(200);
});
