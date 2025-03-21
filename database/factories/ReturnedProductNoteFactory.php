<?php

namespace Database\Factories;

use App\Models\ReturnedProduct;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnedProductNote>
 */
class ReturnedProductNoteFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'returned_product_id' => ReturnedProduct::inRandomOrder()->first()->id,
            'note' => $this->faker->sentence(),
            'user_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
