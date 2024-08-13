<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TrainsetCarriages;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainsetCarriages>
 */
class TrainsetCarriagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_trainset' => TrainsetCarriages::inRandomOrder()->first()->id_trainset,
            'id_carriage' => TrainsetCarriages::inRandomOrder()->first()->id_carriage,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
