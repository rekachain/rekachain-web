<?php

use App\Models\User;

test('view all projects', function () {
    $superAdmin = User::factory()->superAdmin()->create([
        'email_verified_at' => null,
    ]);

    $this->actingAs($superAdmin)->get('/api/projects')->assertStatus(200);
});
