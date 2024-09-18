<?php

namespace Database\Factories;

use App\Models\Carriage;
use App\Models\PresetTrainset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarriagePreset>
 */
class CarriagePresetFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'preset_trainset_id' => PresetTrainset::inRandomOrder()->first()->id,
            'carriage_id' => Carriage::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
