<?php

use App\Models\Carriage;

test('view all Carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->get('/api/carriages')->assertStatus(200);
});

test('show one carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->get('/api/carriages/' . $carriage->id)->assertStatus(200);
});

test('store carriage', function () {
    actAsSuperAdmin()->post('/api/carriages', [
        'type' => 'test',
        'description' => 'description test',
    ])->assertStatus(201);
});

test('update carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->put('/api/carriages/' . $carriage->id, [
        'type' => 'eaea',
    ])->assertStatus(200);
});

test('destroy carriage', function () {
    $carriage = $this->dummy->createCarriage();
    actAsSuperAdmin()->delete('/api/carriages/' . $carriage->id)->assertStatus(200);
});
