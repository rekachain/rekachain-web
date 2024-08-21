<?php

namespace Database\Seeders;

use App\Models\Panel;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PanelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get CSV file
        if (file_exists(base_path('database/data/panel.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/panel.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                Panel::factory()->create($data);
            }
        } else {
            Panel::factory(1)->create();
        }
    }
}
