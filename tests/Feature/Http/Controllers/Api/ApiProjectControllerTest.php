<?php

use App\Models\User;

// test('example', function () {
//     $response = $this->get('/');

//     $response->assertStatus(200);
// });

test('view all projects', function () {
    $superAdmin = User::find(1);
    $this->actingAs($superAdmin);
    $response = $this->get('/api/projects');

    $response->assertStatus(200);
});
