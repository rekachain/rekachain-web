<?php

use App\Models\Carriage;

test('view all Carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->get('/api/carriages')->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'type',
                    'description',
                    'pivot',
                    'created_at',
                    'updated_at',
                    'can_be_deleted',
                ]
            ],
            'meta'
        ]);
});

test('show one carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->get('/api/carriages/' . $carriage->id)->assertStatus(200)
        ->assertJson([
            'id' => $carriage->id,
            'type' => $carriage->type,
            'description' => $carriage->description,
            'pivot' => $carriage->pivot,
        ]);
});

test('store carriage', function () {
    actAsSuperAdmin()->post('/api/carriages', [
        'type' => 'test carriage',
        'description' => 'description test carriage',
    ])->assertStatus(201);

    $this->assertDatabaseHas('carriages', [
            'type' => 'test carriage',
            'description' => 'description test carriage',
        ]);
});

test('update carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->put('/api/carriages/' . $carriage->id, [
        'type' => 'update carriage',
        'description' => 'description update carriage',
    ])->assertStatus(200);

    $this->assertDatabaseHas('carriages', [
        'id' => $carriage->id,
        'type' => 'update carriage',
        'description' => 'description update carriage',
    ]);
});

// NOT IMPLEMENTED
// test('destroy carriage', function () {
//     $carriage = $this->dummy->createCarriage();
//     actAsSuperAdmin()->delete('/api/carriages/' . $carriage->id)->assertStatus(200);
// });
