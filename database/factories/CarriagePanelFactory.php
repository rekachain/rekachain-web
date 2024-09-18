<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Progress;
use App\Models\CarriageTrainset;
use App\Models\Panel;

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
            'qty'=> $this->faker->numberBetween(1, 10),
        ];
    }
}
