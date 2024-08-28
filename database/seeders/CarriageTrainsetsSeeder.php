<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriageTrainset;
use App\Models\Trainset;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class CarriageTrainsetsSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('carriage_trainset');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                if (Carriage::whereType($data['carriage_type'])->exists() && Trainset::whereName($data['trainset_name'])->exists()) {
                    CarriageTrainset::create([
                        'trainset_id' => Trainset::whereName($data['trainset_name'])->first()->id,
                        'carriage_id' => Carriage::whereType($data['carriage_type'])->first()->id,
                        'qty' => $data['qty'],
                    ]);
                }
            }
        } else {
            CarriageTrainset::factory(1)->create();
        }
    }
}
