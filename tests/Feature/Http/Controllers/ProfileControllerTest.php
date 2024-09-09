<?php

test('can get get all carriage', function () {
    actAsSuperAdmin()->get('/carriages')->assertStatus(200);
});
