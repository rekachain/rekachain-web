<?php

namespace Database\Seeders;

use App\Models\Carriage;
use Illuminate\Database\Seeder;

class CarriageSeeder extends Seeder
{
    public function run(): void {
        // Get the CSV file
        if (file_exists(base_path('database/data/carriage.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/carriage.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                Carriage::factory()->create($data);
            }
        }else{
            Carriage::factory(1)->create();
        }
    }
}
