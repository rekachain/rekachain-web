<?php

use App\Models\User;

test('login Success', function () {
    $user = User::factory()->ppcPengendalian()->create();
    $response = $this->postJson('/api/login', [
        'nip' => $user->nip,
        'password' => 'password',
    ])->assertStatus(200)
        ->assertJsonStructure([
            'user',
            'token',
            'role',
            'permissions',
        ]);
});

test('login Failed', function () {
    $user = User::factory()->ppcPengendalian()->create();
    $response = $this->postJson('/api/login', [
        'nip' => $user->nip,
        'password' => 'invalid-password',
    ])->assertStatus(401);
});

test('logout Success', function () {
    $user = User::factory()->ppcPengendalian()->create();

    // Login user
    $loginResponse = $this->postJson('/api/login', [
        'nip' => $user->nip,
        'password' => 'password',
    ])->assertStatus(200);

    $token = $loginResponse->json('token');

    // Logout user
    $logoutResponse = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->getJson('/api/logout');

    $logoutResponse->assertStatus(200)
        ->assertJson([
            'message' => 'Logged out',
        ]);
});
