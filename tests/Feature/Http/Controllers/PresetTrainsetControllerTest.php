<?php

use App\Models\User;
use App\Models\Project;
use App\Models\Trainset;
use App\Models\PresetTrainset;

test('can get get all preset trainsets', function () {
    $superAdmin = User::factory()->superAdmin()->create([
        'email_verified_at' => null,
    ]);

    $this->actingAs($superAdmin)->get('/preset-trainsets')->assertStatus(200);
});

test('can change existing preset', function () {
    $superAdmin = User::factory()->superAdmin()->create([
        'email_verified_at' => null,
    ]);

    $presetTrainset = PresetTrainset::factory()->create();
    $response = $this->actingAs($superAdmin)->putJson("/preset-trainsets/{$presetTrainset->id}", [
        'name' => 'Updated Preset Name',
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('preset_trainsets', [
        'id' => $presetTrainset->id,
        'name' => 'Updated Preset Name',
    ]);

});

test('can delete preset if no trainsets related', function () {
    $superAdmin = User::factory()->superAdmin()->create();
    $preset = PresetTrainset::factory()->create();

    $response = $this->actingAs($superAdmin)->deleteJson("/preset-trainsets/{$preset->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('preset_trainsets', ['id' => $preset->id]);
});

test('cannot delete preset if trainsets are related', function () {
    $user = User::factory()->superAdmin()->create();
    $preset = PresetTrainset::factory()->create();
    Trainset::factory()->create(['preset_trainset_id' => $preset->id]);

    $response = $this->actingAs($user)->deleteJson("/preset-trainsets/{$preset->id}");

    // $response->assertStatus(422);
    $this->assertDatabaseHas('preset_trainsets', ['id' => $preset->id]);
});

test('can change preset from custom/null preset id', function () {
    $superAdmin = User::factory()->superAdmin()->create();
    $project = new Project();
    $project->name = 'Project';
    $project->save();
    $trainset = Trainset::factory()->create(['preset_trainset_id' => null]);
    $newPreset = PresetTrainset::factory()->create();

    $response = $this->actingAs($superAdmin)->putJson("/trainsets/{$trainset->id}", [
        'intent' => "WEB_PROJECT_CHANGE_TRAINSET_PRESET",
        'preset_trainset_id' => $newPreset->id
    ]);

    $response->assertStatus(200);
    $this->assertDatabaseHas('trainsets', [
        'id' => $trainset->id,
        'preset_trainset_id' => $newPreset->id
    ]);
});
