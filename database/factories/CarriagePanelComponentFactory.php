<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\Progress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarriagePanelComponent>
 */
class CarriagePanelComponentFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            //
            'component_id' => Component::inRandomOrder()->first()->id,
            'carriage_panel_id' => CarriagePanel::inRandomOrder()->first()->id,
            'progress_id' => Progress::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
