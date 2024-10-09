<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\Progress;
use App\Models\WorkAspect;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class ComponentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('component');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                if (Progress::where('name', 'LIKE', '%' . $data['panel_name'] . '%')->whereWorkAspectId(WorkAspect::whereName($data['work_aspect'])->first()->id)->exists()) {
                    Component::create([
                        'name' => $data['component'],
                        'progress_id' => Progress::where('name', 'LIKE', '%' . $data['panel_name'] . '%')->whereWorkAspectId(WorkAspect::whereName($data['work_aspect'])->first()->id)->first()->id,
                    ]);
                }
            }
        }
    }
}
