<?php

test('view all Carriage', function () {
    actAsSuperAdmin()->get('/api/carriages')->assertStatus(200);
});
