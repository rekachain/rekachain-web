<?php

namespace Database\Seeders;

use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\Panel;
use App\Models\ReturnedProduct;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ReturnedProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReturnedProduct::factory(3)->state(new Sequence(
            function () {
                $carriagePanel = CarriagePanel::inRandomOrder()->first();
                return [
                    'product_returnable_id' => Panel::whereId($carriagePanel->panel_id)->first()->id,
                    'serial_panel_id' => $carriagePanel->panel_attachments()->inRandomOrder()->first()->serial_panels()->inRandomOrder()->first()->id,
                ];
            },
        ))->create([
            'product_returnable_type' => Panel::class,
            'qty' => 1,
        ]);
        ReturnedProduct::factory(5)->create([
            'product_returnable_type' => Component::class,
            'serial_panel_id' => null,
        ]);
        // seed buyer request
        ReturnedProduct::factory(3)->create([
            'status' => ReturnedProductStatusEnum::REQUESTED->value,
            'serial_panel_id' => null
        ]);
    }
}
