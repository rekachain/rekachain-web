<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\Trainset;
use App\Models\TrainsetCarriages;
use Illuminate\Database\Seeder;

class TrainsetCarriagesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        if (file_exists(base_path('database/data/trainset_carriages.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/trainset_carriages.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                \Log::info($data);
                TrainsetCarriages::factory()->create([
                    'trainset_id' => Trainset::where('name', $data['trainset_name'])->first()->id,
                    'carriage_id' => Carriage::where('type', $data['carriage_type'])->first()->id,
                    'qty' => $data['qty'],
                ]);
                \Log::info('ss');
            }
        } else {
            TrainsetCarriages::factory(1)->create();
        }
    }
}
