<?php

namespace Database\Factories;

// use App\Models\Carriage;
// use App\Models\Progress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Panel>
 */
class PanelFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            // 'progress_id' => Progress::inRandomOrder()->first()->id,
            // 'carriage_id' => Carriage::inRandomOrder()->first()->id,
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
        ];
    }
}
