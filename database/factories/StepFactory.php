<?php

namespace Database\Factories;

use App\Models\Step;
use Illuminate\Database\Eloquent\Factories\Factory;

class StepFactory extends Factory {
    protected $model = Step::class;

    public function definition(): array {
        return [
            'name' => $this->faker->word,
            'process' => $this->faker->sentence,
            'estimated_time' => $this->faker->numberBetween(5, 30),
        ];
    }
}
