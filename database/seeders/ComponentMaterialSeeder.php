<?php

namespace Database\Seeders;

use App\Models\CarriagePanelComponent;
use Illuminate\Database\Seeder;
use App\Models\ComponentMaterial;
use Database\Seeders\Helpers\CsvReader;

class ComponentMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('component_material');

        $csvData = $csvReader->getCsvData();

        if (!$csvData) {
            foreach (CarriagePanelComponent::all() as $carriagePanelComponent) {
                ComponentMaterial::factory(rand(5, 10))->create([
                    'carriage_panel_component_id' => $carriagePanelComponent->id
                ]);
            }

            return;
        }
        foreach ($csvData as $row) {
            ComponentMaterial::factory()->create($row);
        }
    }
}
