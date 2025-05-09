<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RawMaterial>
 */
class RawMaterialFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'material_code' => $this->faker->unique()->randomNumber(8),
            'description' => $this->faker->sentence,
            'specs' => $this->faker->word,
            'unit' => $this->faker->randomElement(['PCS', 'L', 'M', 'KG']),
        ];
    }
}
