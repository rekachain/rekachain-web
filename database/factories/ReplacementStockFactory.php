<?php

namespace Database\Factories;

use App\Models\Component;
use App\Models\ReplacementStock;
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
        // Get all component IDs that are not already in the replacement_stocks table
        $availableComponentIds = Component::whereNotIn('id', ReplacementStock::pluck('component_id')->toArray())
            ->pluck('id')
            ->toArray();

        if (empty($availableComponentIds)) {
            throw new \Exception('No available components to assign to ReplacementStock.');
        }

        return [
            'component_id' => $this->faker->unique()->randomElement($availableComponentIds),
            'threshold' => 0,
            'qty' => $this->faker->numberBetween(5, 20),
        ];
    }
}
