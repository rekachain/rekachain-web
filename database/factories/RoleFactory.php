<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'name' => fake()->unique()->word(),
            'guard_name' => 'web',
        ];
    }

    /**
     * Testing purpose only.
     */
    public function superAdmin() {
        return $this->state([
            'name' => 'Super Admin',
        ]);
    }

    /**
     * Testing purpose only.
     */
    public function ppcPerencanaan() {
        return $this->state([
            'name' => 'PPC Perencanaan',
        ]);
    }

    /**
     * Testing purpose only.
     */
    public function ppcPengendalian() {
        return $this->state([
            'name' => 'PPC Pengendalian',
        ]);
    }
}
