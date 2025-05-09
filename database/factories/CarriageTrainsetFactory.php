<?php

namespace Database\Factories;

use App\Models\Carriage;
use App\Models\Trainset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trainset>
 */
class CarriageTrainsetFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'trainset_id' => Trainset::inRandomOrder()->first()->id,
            'carriage_id' => Carriage::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
