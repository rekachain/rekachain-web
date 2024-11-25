<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FailedComponentManufacture>
 */
class FailedComponentManufactureFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'detail_worker_trainset_id' => \App\Models\DetailWorkerTrainset::inRandomOrder()->first()->id,
            'notes' => $this->faker->sentence(),
        ];
    }
}
