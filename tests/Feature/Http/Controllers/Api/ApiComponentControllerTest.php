<?php

use App\Models\User;

test('view all Components', function () {
    $superAdmin = User::factory()->superAdmin()->create([
        'email_verified_at' => null,
    ]);

    $this->actingAs($superAdmin)->get('/api/components')->assertStatus(200);
});
