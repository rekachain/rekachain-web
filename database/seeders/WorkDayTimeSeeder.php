<?php

namespace Database\Seeders;

use App\Models\WorkDayTime;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkDayTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Get the CSV file
        if (file_exists(base_path('database/data/workdaytimes.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/workdaytimes.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                WorkDayTime::factory()->create($data);
            }
        } else {
            WorkDayTime::factory(10)->create();
        }
    }
}
