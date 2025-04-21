<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\Panel;
use App\Models\Project;
use App\Models\ReturnedProduct;
use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductRestock>
 */
class ProductRestockFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $product_returnable_type = $this->faker->randomElement([Panel::class, Component::class]);
        $returnedProduct = $product_returnable_type == Panel::class ? Panel::whereId(CarriagePanel::inRandomOrder()->first()->panel_id)->first() : $product_returnable_type::inRandomOrder()->first();

        return [
            'returned_product_id' => ReturnedProduct::inRandomOrder()->first()->id ?? ReturnedProduct::factory()->create()->id,
            'product_restockable_id' => $returnedProduct->id,
            'product_restockable_type' => $product_returnable_type,
            'project_id' => Project::firstOrCreate(
                ['name' => 'Restock Project'],
            )->id,
            'status' => $this->faker->randomElement(ProductRestockStatusEnum::toArray()),
        ];
    }
}
