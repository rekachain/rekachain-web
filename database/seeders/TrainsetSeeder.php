<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Trainset;
use Illuminate\Database\Seeder;

class TrainsetSeeder extends Seeder
{
    public function run(): void {
        // Get the CSV file
        if (file_exists(base_path('database/data/trainset.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/trainset.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                Trainset::factory()->create(['project_id' => Project::where('name', $data['project_name'])->first()->id, 'name' => $data['trainset_name']]);
            }
        }else{
            Trainset::factory(1)->create();
        }
    }
}