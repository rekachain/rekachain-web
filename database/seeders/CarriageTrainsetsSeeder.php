<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriageTrainset;
use App\Models\Trainset;
use Illuminate\Database\Seeder;

class CarriageTrainsetsSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        if (file_exists(base_path('database/data/carriage_trainset.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/carriage_trainset.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                \Log::info($data);
                CarriageTrainset::factory()->create([
                    'trainset_id' => Trainset::where('name', $data['trainset_name'])->first()->id,
                    'carriage_id' => Carriage::where('type', $data['carriage_type'])->first()->id,
                    'qty' => $data['qty'],
                ]);
                \Log::info('ss');
            }
        } else {
            CarriageTrainset::factory(1)->create();
        }
    }
}
