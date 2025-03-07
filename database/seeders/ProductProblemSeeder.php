<?php

namespace Database\Seeders;

use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\ProductProblem;
use App\Models\ReturnedProduct;
use Illuminate\Database\Seeder;

class ProductProblemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (ReturnedProduct::all() as $product) {
            $isComponent = $product->product_returnable_type == Component::class;
            $componentId = $isComponent ? $product->product_returnable_id : 
                CarriagePanel::wherePanelId($product->product_returnable_id)->inRandomOrder()->first()
                    ->carriage_panel_components()->inRandomOrder()->first()->component_id;
            foreach (range(1, $isComponent ? 1 : rand(1, 3)) as $i) {
                ProductProblem::factory()->create([
                    'returned_product_id' => $product->id,
                    'component_id' => $componentId,
                ]);
            }
        }
    }
}
