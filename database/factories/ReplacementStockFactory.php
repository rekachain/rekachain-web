<?php

namespace Database\Factories;

use App\Models\Component;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReplacementStock>
 */
class ReplacementStockFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'component_id' => $this->faker->unique()->randomElement(
                Component::pluck('id')->toArray()
            ),
            'threshold' => 0,
            'qty' => $this->faker->numberBetween(5, 20),
        ];
    }
}
