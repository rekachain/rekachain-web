<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder {
    public function run(): void {
        // Get the CSV file
        if (file_exists(base_path('database/data/project.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/project.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                Project::factory()->create($data);
            }
        } else {
            Project::factory(1)->create();
        }
    }
}
