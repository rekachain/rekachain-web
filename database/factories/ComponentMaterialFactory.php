<?php

namespace Database\Factories;

use App\Models\RawMaterial;
use App\Models\CarriagePanelComponent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ComponentMaterial>
 */
class ComponentMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'carriage_panel_component_id' => CarriagePanelComponent::inRandomOrder()->first()->id,
            'raw_material_id' => RawMaterial::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 100),
            // add other fields as needed
        ];
    }
}
