<?php

test('view all panel-attachment-handlers', function () {
    actAsSuperAdmin()->get('/api/panel-attachment-handlers')->assertStatus(200);
});
