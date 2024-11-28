<!-- FAILED COMPONENT MANUFACTURE ROUTE NOT READY -->
<?php

// test('index return failed component manufactures', function () {
//     actAsSuperAdmin()->getJson('/failed-component-manufactures')
//         ->assertStatus(200)
//         ->assertJsonStructure([
//             'id',
//             'detail_worker_trainset_id',
//             'trainset_attachment_component',
//             'notes',
//             'created_at',
//             'updated_at',
//         ])
//         ->assertInertia(fn ($assert) => $assert->component('FailedComponentManufacture/Index'));
// });

// test('create return failed component manufacture create page', function () {
//     actAsSuperAdmin()->get('/failed-component-manufactures/create')
//         ->assertStatus(200)
//         ->assertInertia(fn ($assert) => $assert->component('FailedComponentManufacture/Create'));
// });

// test('store failed component manufacture', function () {
//     actAsSuperAdmin()->postJson('/failed-component-manufactures', [
//         'detail_worker_trainset_id' => 1,
//         'trainset_attachment_component' => 1,
//         'notes' => 'Test notes',
//     ])->assertStatus(201);
// });

// test('show failed component manufacture', function () {
//     $failedComponentManufacture = FailedComponentManufacture::factory()->create();
//     actAsSuperAdmin()->getJson('/failed-component-manufactures/' . $failedComponentManufacture->id)
//         ->assertStatus(200)
//         ->assertJsonStructure([
//             'id',
//             'detail_worker_trainset_id',
//             'trainset_attachment_component',
//             'notes',
//             'created_at',
//             'updated_at',
//         ]);
// });

// test('edit return failed component manufacture edit page', function () {
//     $failedComponentManufacture = FailedComponentManufacture::factory()->create();
//     actAsSuperAdmin()->get('/failed-component-manufactures/' . $failedComponentManufacture->id . '/edit')
//         ->assertStatus(200)
//         ->assertJsonStructure([
//             'detail_worker_trainset_id',
//             'notes'
//         ])
//         ->assertInertia(fn ($assert) => $assert->component('FailedComponentManufacture/Edit'));
// });

// test('update failed component manufacture', function () {
//     $failedComponentManufacture = FailedComponentManufacture::factory()->create();
//     actAsSuperAdmin()->putJson('/failed-component-manufactures/' . $failedComponentManufacture->id, [
//         'detail_worker_trainset_id' => 1,
//         'notes' => 'Test notes',
//     ])->assertStatus(200)
//         ->assertJsonStructure([
//             'id',
//             'detail_worker_trainset_id',
//             'trainset_attachment_component',
//             'notes',
//             'created_at',
//             'updated_at',
//         ]);
// });

// test('destroy failed component manufacture', function () {
//     $failedComponentManufacture = FailedComponentManufacture::factory()->create();
//     actAsSuperAdmin()->delete('/failed-component-manufactures/' . $failedComponentManufacture->id)
//         ->assertStatus(204);
// });
