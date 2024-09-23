<?php

use App\Models\Role;
use App\Models\User;

test('index method returns paginated users', function () {
    $user = User::factory()->superAdmin()->create();
    User::factory()->count(4)->create();

    $response = $this->actingAs($user)->getJson('/users?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/users/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('User/Create'));
});

test('store method creates new User', function () {
    $user = User::factory()->superAdmin()->create();
    $UserData = [
        'name' => 'Test name',
        'nip' => '666',
        'email' => 'test@email.com',
        'password' => 'password'
    ];

    $response = $this->actingAs($user)->postJson('/users', $UserData);

    $response->assertStatus(201);
});

// NOT IMPLEMENTED
// test('store method imports users', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('users.xlsx');

//     $response = $this->actingAs($user)->postJson('/users', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns User details', function () {
    $user = User::factory()->superAdmin()->create();
    $User = User::factory()->create();

    $response = $this->actingAs($user)->getJson("/users/{$User->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $User->id,
            'name' => $User->name,
            'nip' => $User->nip,
            'email' => $User->email,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $User = User::factory()->create();

    $response = $this->actingAs($user)->get("/users/{$User->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('User/Edit'));
});

test('update method updates User', function () {
    $user = User::factory()->superAdmin()->create();
    $User = User::factory()->create();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = $this->actingAs($user)->putJson("/users/{$User->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('users', $updatedData);
});

test('destroy method deletes User', function () {
    $user = User::factory()->superAdmin()->create();
    $User = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/users/{$User->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('users', ['id' => $User->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/users?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('users_template.xlsx');
// });
