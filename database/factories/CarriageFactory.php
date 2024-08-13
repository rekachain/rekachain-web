<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Carriage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Carriage>
 */
class CarriageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            //
        ];
    }
}
