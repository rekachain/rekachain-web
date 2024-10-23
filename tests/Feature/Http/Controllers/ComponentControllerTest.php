<?php

use App\Models\Component;
use App\Models\User;
use App\Support\Enums\IntentEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('index method returns paginated components', function () {
    $user = User::factory()->create();
    createComponent();

    $response = $this->actingAs($user)->getJson('/components?page=1&perPage=10');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/components/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Component/Create'));
});

test('store method creates new component', function () {
    $user = User::factory()->create();
    $componentData = [
        'name' => 'Test name',
    ];

    $response = $this->actingAs($user)->postJson('/components', $componentData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('components', $componentData);
});

// test('store method imports components', function () {
//     Storage::fake('local');
//     $user = User::factory()->create();
//     $file = UploadedFile::fake()->create('components.xlsx');

//     $response = $this->actingAs($user)->postJson('/components', [
//         'intent' => IntentEnum::WEB_component_IMPORT_component->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns component details', function () {
    $user = User::factory()->create();
    $component = createComponent();

    $response = $this->actingAs($user)->getJson("/components/{$component->id}");

    $response->assertStatus(200)
        ->assertJson(['id' => $component->id, 'name' => $component->name]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->create();
    $component = createComponent();

    $response = $this->actingAs($user)->get("/components/{$component->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Component/Edit'));
});

test('update method updates component', function () {
    $user = User::factory()->create();
    $component = createComponent();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = $this->actingAs($user)->putJson("/components/{$component->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('components', $updatedData);
});

test('destroy method deletes component', function () {
    $user = User::factory()->create();
    $component = createComponent();

    $response = $this->actingAs($user)->deleteJson("/components/{$component->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('components', ['id' => $component->id]);
});

test('index method returns import template', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/components?intent=' . IntentEnum::WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT->value);

    $response->assertStatus(200)
        ->assertDownload('component_template.xlsx');
});
