<?php

use App\Models\User;
use App\Providers\RouteServiceProvider;

test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function () {
    /**
     * only specific role have authorization to use web app
     * in this case only:
     * - SUPER_ADMIN
     * - PPC_PERENCANAAN
     * - PPC_PENGENDALIAN
     * - SUPERVISOR_MEKANIK
     * - SUPERVISOR_ELEKTRIK
     * - SUPERVISOR_ASSEMBLY
     * can login to the web app
     */
    $user = User::factory()->superAdmin()->create();

    $response = $this->post('/login', [
        'nip' => $user->nip,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
