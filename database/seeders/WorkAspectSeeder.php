<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\WorkAspect;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class WorkAspectSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('work_aspect');
        $csvData = $csvReader->getCsvData();

        WorkAspect::factory()->create([
            'name' => 'Fabrikasi',
            'division_id' => Division::whereName('Mekanik')->first()->id,
        ]);
        WorkAspect::factory()->create([
            'name' => 'Cutting Harness',
            'division_id' => Division::whereName('Elektrik')->first()->id,
        ]);
        WorkAspect::factory()->create([
            'name' => 'Fitting & Koneksi',
            'division_id' => Division::whereName('Assembly')->first()->id,
        ]);
        WorkAspect::factory()->create([
            'name' => 'Harmonika',
        ]);

        if ($csvData) {
            foreach ($csvData as $data) {
                WorkAspect::factory()->create($data);
            }

            return;
        }
    }
}
