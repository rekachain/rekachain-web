<?php

namespace Database\Seeders;

use App\Models\CarriagePanelComponent;
use App\Models\ComponentMaterial;
use App\Models\RawMaterial;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ComponentMaterialSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('component_material');

        $csvData = $csvReader->getCsvData();

        if (!$csvData) {
            foreach (CarriagePanelComponent::all() as $carriagePanelComponent) {
                for ($i = 0; $i < rand(5, 10); $i++) {
                    ComponentMaterial::factory()->create([
                        'carriage_panel_component_id' => $carriagePanelComponent->id,
                        'raw_material_id' => RawMaterial::whereNotIn('id', $carriagePanelComponent->component_materials->pluck('raw_material_id'))->inRandomOrder()->first()->id,
                    ]);
                }
            }

            return;
        }
        foreach ($csvData as $row) {
            ComponentMaterial::factory()->create($row);
        }
    }
}
