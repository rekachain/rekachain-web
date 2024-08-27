<?php

namespace Database\Seeders;

use App\Models\Project;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder {
    public function run(): void {
        $csvReader = new CsvReader('project');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                Project::create($data);
            }
        } else {
            Project::factory(2)->create();
        }
    }
}
