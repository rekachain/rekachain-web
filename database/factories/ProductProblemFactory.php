<?php

namespace Database\Factories;

use App\Models\Component;
use App\Models\ReturnedProduct;
use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductProblem>
 */
class ProductProblemFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'returned_product_id' => ReturnedProduct::inRandomOrder()->first()->id ?? ReturnedProduct::factory()->create()->id,
            'component_id' => Component::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(ProductProblemStatusEnum::toArray()),
        ];
    }
}
