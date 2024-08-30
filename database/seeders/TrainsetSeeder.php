<?php

namespace Database\Seeders;

use App\Models\PresetTrainset;
use App\Models\Project;
use App\Models\Trainset;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class TrainsetSeeder extends Seeder {
    public function run(): void {
        $csvReader = new CsvReader('trainset');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                if (Project::whereName($data['project_name'])->exists()) {
                    Trainset::create([
                        'project_id' => Project::whereName($data['project_name'])->first()->id,
                        'name' => $data['trainset_name'],
                        'preset_trainset_id' => PresetTrainset::whereName($data['preset'])->first()->id ?? null, // jika ada
                    ]);
                }

                // TODO: create new project

            }
        } else {
            Trainset::factory(1)->create();
        }

    }
}
