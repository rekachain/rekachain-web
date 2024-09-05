<?php


test('view all Components', function () {
    createComponent();
    actAsSuperAdmin()->get('/api/components')->assertStatus(200);
});
