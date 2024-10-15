<?php

use App\Models\User;
use App\Models\Carriage;
use App\Models\Trainset;
use App\Models\CarriageTrainset;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\IntentEnum;

test('index method returns paginated carriage-trainsets', function () {
    $user = User::factory()->superAdmin()->create();
    CarriageTrainset::count() > 4 ?? CarriageTrainset::factory()->count(5)->create();

    $response = $this->actingAs($user)->getJson('/carriage-trainsets?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(5, 'data');
});

test('index method returns all carriage-trainsets', function () {
    $user = User::factory()->superAdmin()->create();
    $count = CarriageTrainset::count();

    $response = $this->actingAs($user)->getJson('/carriage-trainsets?perPage=All');

    $response->assertStatus(200)
        ->assertJsonCount($count)
        ->assertJsonStructure([
            '*' => ['id', 'qty']
        ]);
});

// NOT YET IMPLEMENTED
// test('create method returns create view', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->get('/carriage-trainsets/create');

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('CarriageTrainset/Create'));
// });

test('store method creates new carriageTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $carriage = $this->dummy->createCarriage();
    $trainset = $this->dummy->createTrainset();

    $carriageTrainsetData = [
        'carriage_id' => $carriage->id,
        'trainset_id' => $trainset->id,
        'qty' => 5,
    ];

    $response = $this->actingAs($user)->postJson('/carriage-trainsets', $carriageTrainsetData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'id', 'qty',
            'trainset' => ['id', 'project_id', 'name'],
        ]);
    $this->assertDatabaseHas('carriage_trainset', $carriageTrainsetData);
});

test('show method returns carriageTrainset details', function () {
    $user = User::factory()->superAdmin()->create();
    $carriageTrainset = $this->dummy->createCarriageTrainset();

    $response = $this->actingAs($user)->getJson("/carriage-trainsets/{$carriageTrainset->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $carriageTrainset->id,
            'qty' => $carriageTrainset->qty,
        ]);
});

// NOT YET IMPLEMENTED
// test('edit method returns edit view', function () {
//     $user = User::factory()->superAdmin()->create();
//     $carriageTrainset = $this->dummy->createCarriageTrainset();

//     $response = $this->actingAs($user)->get("/carriage-trainsets/{$carriageTrainset->id}/edit");

//     $response->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert
//             ->component('CarriageTrainset/Edit')
//             ->has('carriageTrainset')
//         );
// });

test('update method updates carriageTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $carriageTrainset = $this->dummy->createCarriageTrainset();
    $newCarriage = $this->dummy->createCarriage();
    $newTrainset = $this->dummy->createTrainset();

    $updatedData = [
        'carriage_id' => $newCarriage->id,
        'trainset_id' => $newTrainset->id,
        'qty' => 4,
    ];

    $response = $this->actingAs($user)->putJson("/carriage-trainsets/{$carriageTrainset->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson([
            'id' => $carriageTrainset->id,
            'qty' => $updatedData['qty'],
        ]);
    $this->assertDatabaseHas('carriage_trainset', $updatedData);
});

test('update method adds carriage panel', function () {
    $user = User::factory()->superAdmin()->create();
    $carriageTrainset = $this->dummy->createCarriageTrainset();
    $panel = $this->dummy->createPanel();

    $data = [
        'trainset_id' => $carriageTrainset->trainset_id,
        'carriage_id' => $carriageTrainset->carriage_id,
        'panel_id' => $panel->id,
        'qty' => 2,
        'carriage_panel_progress_id' => $this->dummy->createProgress()->id,
        'panel_name' => $panel->name,
        'panel_description' => $panel->description,
        'carriage_panel_qty' => 2,
        'intent' => IntentEnum::WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL->value,
    ];

    $response = $this->actingAs($user)->putJson("/carriage-trainsets/{$carriageTrainset->id}", $data);

    $response->assertStatus(200);
    $this->assertDatabaseHas('carriage_panels', [
        'carriage_trainset_id' => $carriageTrainset->id,
        'panel_id' => $panel->id,
        'qty' => 2,
    ]);
});

test('destroy method deletes carriageTrainset', function () {
    $user = User::factory()->superAdmin()->create();
    $carriageTrainset = $this->dummy->createCarriageTrainset();

    $response = $this->actingAs($user)->deleteJson("/carriage-trainsets/{$carriageTrainset->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('carriage_trainset', ['id' => $carriageTrainset->id]);
});

test('unauthorized access is denied', function () {
    $user = User::factory()->create();
    $carriageTrainset = $this->dummy->createCarriageTrainset();

    $this->actingAs($user)->getJson('/carriage-trainsets')->assertStatus(403);
    $this->actingAs($user)->getJson("/carriage-trainsets/{$carriageTrainset->id}")->assertStatus(403);
    $this->actingAs($user)->postJson('/carriage-trainsets', [
        'carriage_id' => $this->dummy->createCarriage()->id,
        'trainset_id' => $this->dummy->createTrainset()->id,
        'qty' => 1,
    ])->assertStatus(403);
    $this->actingAs($user)->putJson("/carriage-trainsets/{$carriageTrainset->id}", [])->assertStatus(403);
    $this->actingAs($user)->deleteJson("/carriage-trainsets/{$carriageTrainset->id}")->assertStatus(403);
});
