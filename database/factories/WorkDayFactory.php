<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkDay>
 */
class WorkDayFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'day' => $this->faker->unique()->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
        ];
    }
}
