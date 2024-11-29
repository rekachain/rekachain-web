<?php

namespace Database\Seeders;

use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
use App\Models\RawMaterial;
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
                for ($i = 0; $i < rand(5, 10); $i++) {
                    PanelMaterial::factory()->create([
                        'carriage_panel_id' => $carriagePanel->id,
                        'raw_material_id' => RawMaterial::whereNotIn('id', $carriagePanel->panel_materials->pluck('raw_material_id'))->inRandomOrder()->first()->id,
                    ]);
                }
            }

            return;
        }
        foreach ($csvData as $row) {
            PanelMaterial::factory()->create($row);
        }
    }
}
