<?php

namespace Database\Seeders;

use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PanelMaterialSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('panel_material');

        $csvData = $csvReader->getCsvData();

        if (!$csvData) {
            foreach (CarriagePanel::all() as $carriagePanel) {
                PanelMaterial::factory(rand(5, 20))->create([
                    'carriage_panel_id' => $carriagePanel->id
                ]);
            }

            return;
        }
        foreach ($csvData as $row) {
            PanelMaterial::factory()->create($row);
        }
    }
}
