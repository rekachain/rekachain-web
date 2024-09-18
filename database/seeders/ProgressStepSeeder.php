<?php

namespace Database\Seeders;

use App\Models\ProgressStep;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ProgressStepSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('progress_step');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                ProgressStep::create($data);
            }
        } else {
            ProgressStep::factory(10)->create();
        }
    }
}