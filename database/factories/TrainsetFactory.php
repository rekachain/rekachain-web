<?php

namespace Database\Factories;

use App\Models\Project;
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
            'project_id' => Project::inRandomOrder()->first()->id,
        ];
    }
}
