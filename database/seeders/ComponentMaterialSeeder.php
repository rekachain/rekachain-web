<?php

namespace Database\Seeders;

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
            ComponentMaterial::factory(30)->create();

            return;
        }
        foreach ($csvData as $row) {
            ComponentMaterial::factory()->create($row);
        }
    }
}
