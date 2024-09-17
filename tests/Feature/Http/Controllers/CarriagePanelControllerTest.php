<?php

// use App\Models\User;
// use App\Models\CarriagePanel;

// test('index method returns paginated carriage-panels', function () {
//     $user = User::factory()->create();
//     CarriagePanel::factory()->count(5)->create();

//     $response = $this->actingAs($user)->getJson('/carriage-panels?page=1&perPage=5');

//     $response->assertStatus(200)
//         ->assertJsonStructure(['data', 'meta'])
//         ->assertJsonCount(5, 'data');
// });

// // test('create method returns create page', function () {
// //     $user = User::factory()->create();

// //     $response = $this->actingAs($user)->get('/carriage-panels/create');

// //     $response->assertStatus(200)
// //         ->assertInertia(fn ($assert) => $assert->component('CarriagePanel/Create'));
// // });

// test('store method creates new carriagePanel', function () {
//     $user = User::factory()->create();
//     $carriagePanelData = [
//         'day' => 'Test day',
//     ];

//     $response = $this->actingAs($user)->postJson('/carriage-panels', $carriagePanelData);

//     $response->assertStatus(201)
//         ->assertJsonStructure(['id', 'day']);
//     $this->assertDatabaseHas('carriage_panels', $carriagePanelData);
// });

// // NOT IMPLEMENTED
// // test('store method imports carriage-panels', function () {
// //     Storage::fake('local');
// //     $user = User::factory()->create();
// //     $file = UploadedFile::fake()->create('carriage-panels.xlsx');

// //     $response = $this->actingAs($user)->postJson('/carriage-panels', [
// //         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
// //         'import_file' => $file,
// //     ]);

// //     $response->assertStatus(204);
// // });

// test('show method returns carriagePanel details', function () {
//     $user = User::factory()->create();
//     $carriagePanel = CarriagePanel::factory()->create();

//     $response = $this->actingAs($user)->getJson("/carriage-panels/{$carriagePanel->id}");

//     $response->assertStatus(200)
//         ->assertJson(['id' => $carriagePanel->id, 'day' => $carriagePanel->day]);
// });

// // test('edit method returns edit page', function () {
// //     $user = User::factory()->create();
// //     $carriagePanel = CarriagePanel::factory()->create();

// //     $response = $this->actingAs($user)->get("/carriage-panels/{$carriagePanel->id}/edit");

// //     $response->assertStatus(200)
// //         ->assertInertia(fn ($assert) => $assert->component('CarriagePanel/Edit'));
// // });

// test('update method updates carriagePanel', function () {
//     $user = User::factory()->create();
//     $carriagePanel = CarriagePanel::factory()->create();
//     $updatedData = [
//         'day' => 'Updated Day',
//     ];

//     $response = $this->actingAs($user)->putJson("/carriage-panels/{$carriagePanel->id}", $updatedData);

//     $response->assertStatus(200)
//         ->assertJson($updatedData);
//     $this->assertDatabaseHas('carriage_panels', $updatedData);
// });

// test('destroy method deletes carriagePanel', function () {
//     $user = User::factory()->create();
//     $carriagePanel = CarriagePanel::factory()->create();

//     $response = $this->actingAs($user)->deleteJson("/carriage-panels/{$carriagePanel->id}");

//     $response->assertStatus(200);
//     $this->assertDatabaseMissing('carriage_panels', ['id' => $carriagePanel->id]);
// });

// // NOT IMPLEMENTED
// // test('index method returns import template', function () {
// //     $user = User::factory()->create();

// //     $response = $this->actingAs($user)->getJson('/carriage-panels?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

// //     $response->assertStatus(200)
// //         ->assertDownload('carriage-panels_template.xlsx');
// // });
