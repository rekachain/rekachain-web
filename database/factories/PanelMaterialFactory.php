<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
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
        $carriagePanel = CarriagePanel::inRandomOrder()->first();
        return [
            'carriage_panel_id' => $carriagePanel->id,
            'raw_material_id' => RawMaterial::whereNotIn('id', PanelMaterial::whereCarriagePanelId($carriagePanel->id)->pluck('raw_material_id'))->inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 15),
        ];
    }
}
