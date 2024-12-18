<?php

namespace Database\Seeders;

use App\Models\RawMaterial;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class RawMaterialSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $csvReader = new CsvReader('rawMaterial');
        $csvData = $csvReader->getCsvData();

        if (!$csvData) {
            RawMaterial::factory(30)->create();

            return;
        }

        $uniqueData = [];

        foreach ($csvData as $row) {
            $material_code = $row['material_code'];
            if (!isset($uniqueData[$material_code])) {
                $uniqueData[$material_code] = $row;
            }
        }

        foreach ($uniqueData as $row) {
            RawMaterial::factory()->create($row);
        }
    }
}
