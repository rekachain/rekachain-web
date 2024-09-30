<?php

namespace Database\Seeders;

use App\Models\Step;
use Database\Seeders\Helpers\CsvReader;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StepSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('step');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                Step::factory()->create($data);
            }
        } else {
            Step::factory(10)->create();
        }
    }
}
