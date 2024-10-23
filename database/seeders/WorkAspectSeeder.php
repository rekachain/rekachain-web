<?php

namespace Database\Seeders;

use App\Models\WorkAspect;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkAspectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvReader = new CsvReader('work_aspect');
        $csvData = $csvReader->getCsvData();
        
        WorkAspect::factory()->create([
            'name' => 'Fabrikasi',
            'division_id' => 1,
        ]);
        WorkAspect::factory()->create([
            'name' => 'Cutting Harness',
            'division_id' => 2,
        ]);
        WorkAspect::factory()->create([
            'name' => 'Fitting & Koneksi',
            'division_id' => 3,
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
