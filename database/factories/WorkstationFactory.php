<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workstation>
 */
class WorkstationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workshop_id' => Workshop::inRandomOrder()->first()->id ?? Workshop::factory(),
            'division_id' => Division::inRandomOrder()->first()->id ?? Division::factory(),
            'name' => fake()->name(),
            'location' => fake()->address(),
        ];
    }
}
