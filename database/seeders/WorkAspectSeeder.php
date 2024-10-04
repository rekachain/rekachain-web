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
        
        if ($csvData) {
            foreach ($csvData as $data) {
                WorkAspect::factory()->create($data);
            }
            return;
        }

        WorkAspect::factory()->create([
            'name' => 'Fabrikasi',
        ]);
        WorkAspect::factory()->create([
            'name' => 'Cutting Harness',
        ]);
        WorkAspect::factory()->create([
            'name' => 'Fitting & Koneksi',
        ]);
        WorkAspect::factory()->create([
            'name' => 'Harmonika',
        ]);
    }
}
