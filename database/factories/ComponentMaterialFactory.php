<?php

namespace Database\Factories;

use App\Models\ComponentMaterial;
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
        $carriagePanelComponent = CarriagePanelComponent::inRandomOrder()->first();
        return [
            'carriage_panel_component_id' => $carriagePanelComponent->id,
            'raw_material_id' => RawMaterial::whereNotIn('id', ComponentMaterial::whereCarriagePanelComponentId($carriagePanelComponent->id)->pluck('raw_material_id'))->inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 25),
            // add other fields as needed
        ];
    }
}
