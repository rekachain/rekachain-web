<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\Panel;
use App\Models\User;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnedProduct>
 */
class ReturnedProductFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $product_returnable_type = $this->faker->randomElement([Panel::class, Component::class]);
        $returnedProduct = $product_returnable_type == Panel::class ? Panel::whereId(CarriagePanel::inRandomOrder()->first()->panel_id)->first() : $product_returnable_type::inRandomOrder()->first();

        return [
            'product_returnable_id' => $returnedProduct->id,
            'product_returnable_type' => $product_returnable_type,
            'buyer_id' => User::inRandomOrder()->first()->id,
            'qty' => $this->faker->numberBetween(1, 5),
            'serial_panel_id' => $product_returnable_type == Panel::class ? $returnedProduct->id : null,
            'serial_number' => $this->faker->numberBetween(1, 5),
            'status' => collect(ReturnedProductStatusEnum::cases())
                ->reject(fn (ReturnedProductStatusEnum $status) => $status === ReturnedProductStatusEnum::REQUESTED)
                ->random()->value,
        ];
    }
}
