<?php

use App\Models\User;

test('view all Carriage', function () {
    $superAdmin = User::factory()->superAdmin()->create([
        'email_verified_at' => null,
    ]);

    $this->actingAs($superAdmin)->get('/api/carriages')->assertStatus(200);
});
