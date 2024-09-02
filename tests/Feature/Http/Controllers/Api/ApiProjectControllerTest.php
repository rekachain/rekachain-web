<?php

test('view all projects', function () {
    actAsSuperAdmin()->get('/api/projects')->assertStatus(200);
});
