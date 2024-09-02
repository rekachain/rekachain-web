<?php

test('view all Components', function () {
    actAsSuperAdmin()->get('/api/components')->assertStatus(200);
});
