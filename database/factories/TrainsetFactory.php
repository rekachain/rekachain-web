<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Trainset;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trainset>
 */
class TrainsetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'id_project' => Trainset::inRandomOrder()->first()->id_project,
        ];
    }
}
