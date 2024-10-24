<?php

use App\Models\User;
use App\Models\Project;
use App\Models\Trainset;
use App\Models\CarriageTrainset;
use App\Models\Carriage;
use App\Models\Panel;
use App\Support\Enums\IntentEnum;

test('index method returns paginated projects', function () {
    $user = User::factory()->superAdmin()->create();

    $this->dummy->createProject();

    $response = $this->actingAs($user)->getJson('/projects?page=1&perPage=1');

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
        'name' => 'Test Project',
        'initial_date' => '2023-06-01',
        'trainset_needed' => 5,
    ];

    $response = $this->actingAs($user)->postJson('/projects', $projectData);

    $response->assertStatus(201)
        ->assertJsonStructure(['id', 'name', 'initial_date', 'created_at', 'updated_at']);
    $this->assertDatabaseHas('projects', [
        'name' => $projectData['name'],
        'initial_date' => $projectData['initial_date'],
    ]);
});

test('show method returns project details', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();

    $response = $this->actingAs($user)->getJson("/projects/{$project->id}");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'initial_date', 'trainsets']);
});

test('edit method returns edit page', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();

    $response = $this->actingAs($user)->get("/projects/{$project->id}/edit");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('Project/Edit'));
});

test('update method updates project', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();
    $updatedData = [
        'name' => 'Updated Project Name',
        'initial_date' => '2023-07-01',
        'trainset_needed' => 7,
    ];

    $response = $this->actingAs($user)->putJson("/projects/{$project->id}", $updatedData);

    $response->assertStatus(200)
        ->assertJson([
            'name' => $updatedData['name'],
            'initial_date' => $updatedData['initial_date'],
        ]);
    $this->assertDatabaseHas('projects', [
        'name' => $updatedData['name'],
        'initial_date' => $updatedData['initial_date'],
    ]);
});

test('update method adds trainsets to project', function () {
    $user = User::factory()->superAdmin()->create();

    $project = $this->dummy->createProject();
    $ts = Trainset::where('project_id', $project->id)->count();
    $tsNeeded = 2;
    $trainsetData = [
        'intent' => IntentEnum::WEB_PROJECT_ADD_TRAINSET->value,
        'trainset_needed' => $tsNeeded,
    ];

    $response = $this->actingAs($user)->putJson("/projects/{$project->id}", $trainsetData);

    $response->assertStatus(200);

    if($ts > 1) {
        for($i = 1; $i <= $tsNeeded; $i++) {
            $ts = $ts + $i;
            $this->assertDatabaseHas('trainsets', ['name' => 'TS ' . $ts . '', 'project_id' => $project->id]);
        }
    } else {
        $ts = $project->id;
        for($i = 1; $i <= $tsNeeded; $i++) {
            $this->assertDatabaseHas('trainsets', ['name' => 'TS ' . $ts . '', 'project_id' => $project->id]);
            $ts = $ts + $i;
        }
    }
});

test('destroy method deletes project', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();

    $response = $this->actingAs($user)->deleteJson("/projects/{$project->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});

test('trainsets method returns project trainsets', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();
    Trainset::factory()->count(3)->create(['project_id' => $project->id]);

    $response = $this->actingAs($user)->getJson("/projects/{$project->id}/trainsets");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'trainsets']);
});

test('trainset method returns specific trainset details', function () {
    $user = User::factory()->superAdmin()->create();
    $project = $this->dummy->createProject();
    $trainset = Trainset::factory()->create(['project_id' => $project->id]);

    $response = $this->actingAs($user)->get("/projects/{$project->id}/trainsets/{$trainset->id}");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Project/Trainset/Show')
            ->has('project')
            ->has('trainset')
        );
});

test('carriages method returns trainset carriages', function () {
    $user = User::factory()->superAdmin()->create();

    $carriageTrainset = $this->dummy->createCarriageTrainset();

    $response = $this->actingAs($user)->get("/projects/{$carriageTrainset->trainset->project->id}/trainsets/{$carriageTrainset->trainset->id}/carriage-trainsets");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Project/Trainset/Carriage/Index')
            ->has('project')
            ->has('trainset')
            ->has('presetTrainsets')
        );
});

test('panels method returns carriage panels', function () {
    $user = User::factory()->superAdmin()->create();

    $carriageTrainset = $this->dummy->createCarriageTrainset();

    $response = $this->actingAs($user)->get("/projects/{$carriageTrainset->trainset->project->id}/trainsets/{$carriageTrainset->trainset->id}/carriage-trainsets/{$carriageTrainset->id}/panels");

    $response->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('Project/Trainset/Carriage/Panel/Index')
            ->has('project')
            ->has('trainset')
            ->has('carriageTrainset')
        );
});
