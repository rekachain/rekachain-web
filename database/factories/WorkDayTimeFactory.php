<?php

namespace Database\Factories;

use App\Models\WorkDay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkDayTime>
 */
class WorkDayTimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'work_days_id' => WorkDay::inRandomOrder()->first()->id,
            'start_time' => $this->faker->time(),
            'stop_time' => $this->faker->time(),
            'status' => $this->faker->randomElement(['work', 'break']),
        ];
    }
}
