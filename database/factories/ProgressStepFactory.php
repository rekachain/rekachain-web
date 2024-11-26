<?php

namespace Database\Factories;

use App\Models\Progress;
use App\Models\Step;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProgressStep>
 */
class ProgressStepFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'progress_id' => Progress::inRandomOrder()->first()->id,
            'step_id' => Step::inRandomOrder()->first()->id,
        ];
    }
}
