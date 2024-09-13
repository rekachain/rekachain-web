<?php

test('view all panel-materials', function () {
    actAsSuperAdmin()->get('/api/panel-materials')->assertStatus(200);
});
