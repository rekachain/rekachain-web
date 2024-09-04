<?php

namespace Database\Seeders;

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
            PanelMaterial::factory(10)->create();

            return;
        }
        foreach ($csvData as $row) {
            PanelMaterial::factory()->create($row);
        }
    }
}
