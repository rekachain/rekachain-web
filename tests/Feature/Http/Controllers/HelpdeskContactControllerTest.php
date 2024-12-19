<?php

use App\Models\User;

test('index method returns paginated helpdesk-contacts', function () {
    $this->dummy->createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson('/helpdesk-contact?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

// NOT IMPLEMENTED YET
// test('create method returns create page', function () {

//     $response = actAsSuperAdmin()->get('/helpdesk-contact/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Create'));
// });

test('store method creates new HelpdeskContact', function () {
    $data = [
        'email' => 'help@desk.example',
        'phone_number' => '+6281234567890',
    ];

    $response = actAsSuperAdmin()->postJson('/helpdesk-contact', $data);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'email']);
    $this->assertDatabaseHas('helpdesk_contact', $data);
});

test('show method returns HelpdeskContact details', function () {
    $model = $this->dummy->createHelpdeskContact();

    $response = actAsSuperAdmin()->getJson("/helpdesk-contact/{$model->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $model->id, 'email' => $model->email]);
});

// NOT IMPLEMENTED YET
// test('edit method returns edit page', function () {
//     $model = $this->dummy->createHelpdeskContact();

//     $response = actAsSuperAdmin()->get("/helpdesk-contact/{$model->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('HelpdeskContact/Edit'));
// });

test('update method updates HelpdeskContact', function () {
    $model = $this->dummy->createHelpdeskContact();
    $updatedData = [
        'email' => 'email@update.example',
    ];

    $response = actAsSuperAdmin()->putJson("/helpdesk-contact/{$model->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('helpdesk_contact', $updatedData);
});

test('destroy method deletes HelpdeskContact', function () {
    $model = $this->dummy->createHelpdeskContact();

    $response = actAsSuperAdmin()->deleteJson("/helpdesk-contact/{$model->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('helpdesk_contact', ['id' => $model->id]);
});
