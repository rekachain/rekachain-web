<?php

namespace Database\Seeders;

use App\Models\WorkDay;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkDaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Get the CSV file
        if (file_exists(base_path('database/data/workdays.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/workdays.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                WorkDay::factory()->create($data);
            }
        } else {
            WorkDay::factory(5)->create();
        }
    }
}
