<?php

use App\Models\User;

test('index method returns paginated projects', function () {
    $user = User::factory()->superAdmin()->create();
    createProject();

    $response = $this->actingAs($user)->getJson('/projects?page=1&perPage=5');

    $response->assertStatus(200)
        ->assertJsonStructure(['data', 'meta'])
        ->assertJsonCount(1, 'data');
});

test('create method returns create page', function () {
    $user = User::factory()->superAdmin()->create();

    $response = $this->actingAs($user)->get('/projects/create');

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Project/Create'));
});

test('store method creates new project', function () {
    $user = User::factory()->superAdmin()->create();
    $projectData = [
        'name' => 'Test name',
        'initial_date' => '2023-01-01',
        'trainset_needed' => 7,
    ];

    $response = $this->actingAs($user)->postJson('/projects', $projectData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name']);
    $this->assertDatabaseHas('projects', [
        'name' => $projectData['name'],
        'initial_date' => $projectData['initial_date'],
    ]);
});

// NOT IMPLEMENTED
// test('store method imports projects', function () {
//     Storage::fake('local');
//     $user = User::factory()->superAdmin()->create();
//     $file = UploadedFile::fake()->create('projects.xlsx');

//     $response = $this->actingAs($user)->postJson('/projects', [
//         'intent' => IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value,
//         'import_file' => $file,
//     ]);

//     $response->assertStatus(204);
// });

test('show method returns project details', function () {
    $user = User::factory()->superAdmin()->create();
    $project = createProject();

    $response = $this->actingAs($user)->getJson("/projects/{$project->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $project->id,
            'name' => $project->name,
        ]);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $project = createProject();

    $response = $this->actingAs($user)->get("/projects/{$project->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Project/Edit'));
});

test('update method updates project', function () {
    $user = User::factory()->superAdmin()->create();
    $project = createProject();
    $updatedData = [
        'name' => 'Updated name',
    ];

    $response = $this->actingAs($user)->putJson("/projects/{$project->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson($updatedData);
    $this->assertDatabaseHas('projects', $updatedData);
});

test('destroy method deletes project', function () {
    $user = User::factory()->superAdmin()->create();
    $project = createProject();

    $response = $this->actingAs($user)->deleteJson("/projects/{$project->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});

// NOT IMPLEMENTED
// test('index method returns import template', function () {
//     $user = User::factory()->superAdmin()->create();

//     $response = $this->actingAs($user)->getJson('/projects?intent=' . IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value);

//     $response->assertStatus(200)
//         ->assertDownload('projects_template.xlsx');
// });
