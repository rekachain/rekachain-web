<?php

namespace Database\Seeders;

use App\Models\Progress;
use App\Models\ProgressStep;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ProgressStepSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('step');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            $mekanikSteps = range(3, 12);
            $elektrikSteps = range(13, 16);
            $assemblySteps = range(19, 23);

            $progresses = Progress::all();
            foreach ($progresses as $progress) {
                if (str_contains(strtolower($progress->name), 'fabrikasi') || $progress->work_aspect_id == 1) {
                    foreach ($mekanikSteps as $step) {
                        ProgressStep::factory()->create([
                            'progress_id' => $progress->id,
                            'step_id' => $step,
                        ]);
                    }
                }
                if (str_contains(strtolower($progress->name), 'cutting harness') || $progress->work_aspect_id == 2) {
                    foreach ($elektrikSteps as $step) {
                        ProgressStep::factory()->create([
                            'progress_id' => $progress->id,
                            'step_id' => $step,
                        ]);
                    }
                }
                if (str_contains(strtolower($progress->name), 'fitting & koneksi') || $progress->work_aspect_id == 3) {
                    foreach ($assemblySteps as $step) {
                        ProgressStep::factory()->create([
                            'progress_id' => $progress->id,
                            'step_id' => $step,
                        ]);
                    }
                }
            }
        } else {
            ProgressStep::factory(10)->create();
        }
    }
}
