<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\RawMaterial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PanelMaterial>
 */
class PanelMaterialFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'carriage_panel_id' => CarriagePanel::inRandomOrder()->first()->id,
            'raw_material_id' => RawMaterial::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
