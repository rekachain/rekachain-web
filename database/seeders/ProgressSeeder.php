<?php

namespace Database\Seeders;

use App\Models\Progress;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get CSV file
        if (file_exists(base_path('database/data/progress.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/progress.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                ProgressMaterial::factory()->create($data);
            }
        } else {
            PanelMaterial::factory(1)->create();
        }
    }
}
