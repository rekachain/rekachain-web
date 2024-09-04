<?php

namespace Database\Seeders;

use App\Models\PanelMaterial;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class PanelMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvReader = new CsvReader('panel_material');
        $csvData = $csvReader->getCsvData();

        foreach ($csvData as $row) {
            PanelMaterial::factory()->create($row);
        }
    }
}
