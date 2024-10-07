<?php

namespace Database\Seeders;

use App\Models\Progress;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\WorkAspect;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('progress');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                if (WorkAspect::whereName($data['work_aspect'])->exists()) {
                    Progress::factory()->create([
                        'name' => $data['name'],
                        'work_aspect_id' => WorkAspect::whereName($data['work_aspect'])->first()->id,
                    ]);
                }
            }
        } else {
            Progress::factory(1)->create();
        }
    }
}
