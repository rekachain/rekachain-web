<?php

use App\Models\User;

test('view all Carriage', function () {
    $superAdmin = User::find(1);
    $this->actingAs($superAdmin);
    $response = $this->get('/api/carriages');

    $response->assertStatus(200);
});
