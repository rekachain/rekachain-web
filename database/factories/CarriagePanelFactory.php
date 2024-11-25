<?php

namespace Database\Factories;

use App\Models\CarriageTrainset;
use App\Models\Panel;
use App\Models\Progress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarriagePanel>
 */
class CarriagePanelFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'progress_id' => Progress::inRandomOrder()->first()->id,
            'carriage_trainset_id' => CarriageTrainset::inRandomOrder()->first()->id,
            'panel_id' => Panel::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
