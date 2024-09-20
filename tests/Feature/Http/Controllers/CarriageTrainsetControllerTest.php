<?php

// use App\Models\User;
// use App\Models\Carriage;
// use App\Support\Enums\PermissionEnum;

// test('index method returns paginated carriage-trainsets', function () {
//     $user = User::factory()->superAdmin()->create();
//     createCarriageTrainset();

//     $response = $this->actingAs($user)->getJson('/carriage-trainsets?page=1&perPage=5');

//     $response->assertStatus(200)
//         ->assertJsonStructure(['data', 'meta'])
//         ->assertJsonCount(1, 'data');
// });

// test('store method creates new carriageTrainset', function () {
//     $user = User::factory()->superAdmin()->create();
//     $trainset = createTrainset();
//     $carriage = Carriage::factory()->create();
//     $carriageTrainset = [
//         'carriage_id' => $carriage->id,
//         'trainset_id' => $trainset->project_id,
//         'qty' => 5,
//     ];

//     $response = $this->actingAs($user)->postJson('/carriage-trainsets', $carriageTrainset);

//     $response->assertStatus(201)
//         ->assertJsonStructure(['id', 'trainset_id', 'carriage_id', 'qty']);
//     $this->assertDatabaseHas('carriage_panels', $carriageTrainset);
// });

// test('show method returns carriageTrainset details', function () {
//     $user = User::factory()->superAdmin()->create();
//     $carriageTrainset = createCarriageTrainset();
//     $response = $this->actingAs($user)->getJson("/carriage-trainsets/{$carriageTrainset->id}");

//     $response->assertStatus(200)
//         ->assertJson([
//             'id' => $carriageTrainset->id,
//             // 'trainset_id' => $carriageTrainset->trainset_id,
//             // 'carriage_id' => $carriageTrainset->carriage_id,
//             'qty' => $carriageTrainset->qty,
//         ]);
// });

// test('update method updates carriageTrainset', function () {
//     $user = User::factory()->superAdmin()->create();
//     $newTrainset = createTrainset();
//     $newCarriage = Carriage::factory()->create();
//     $carriageTrainset = createCarriageTrainset();
//     $updatedData = [
//         'trainset_id' => $newTrainset->id,
//         'carriage_id' => $newCarriage->id,
//         'qty' => 4,
//     ];

//     $response = $this->actingAs($user)->putJson("/carriage-trainsets/{$carriageTrainset->id}", $updatedData);

//     $response->assertStatus(200)
//         ->assertJson($updatedData);
//     $this->assertDatabaseHas('carriage_panels', $updatedData);
// });

// test('destroy method deletes carriageTrainset', function () {
//     $user = User::factory()->superAdmin()->create();
//     $carriageTrainset = createCarriageTrainset();

//     $response = $this->actingAs($user)->deleteJson("/carriage-trainsets/{$carriageTrainset->id}?intent=" . PermissionEnum::CARRIAGE_PRESET_DELETE->value);

//     $response->assertStatus(200);
//     $this->assertDatabaseMissing('carriage_panels', ['id' => $carriageTrainset->id]);
// });

