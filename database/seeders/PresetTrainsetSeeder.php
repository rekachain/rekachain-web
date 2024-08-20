<?php

namespace Database\Seeders;

use App\Models\PresetTrainset;
use Illuminate\Database\Seeder;

class PresetTrainsetSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $presets = [
            [
                'name' => 'TSA',
                'project_id' => 1,
            ],
            [
                'name' => 'TSB',
                'project_id' => 1,
            ],
            [
                'name' => 'TSC',
                'project_id' => 1,
            ],
        ];

        foreach ($presets as $preset) {
            PresetTrainset::create($preset);
        }
    }
}
