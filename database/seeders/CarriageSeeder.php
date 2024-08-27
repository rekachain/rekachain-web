<?php

namespace Database\Seeders;

use App\Models\Carriage;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class CarriageSeeder extends Seeder {
    public function run(): void {
        $csvReader = new CsvReader('carriage');
        $csvData = $csvReader->getCsvData();
        if ($csvData) {
            foreach ($csvData as $data) {
                Carriage::create($data);
            }
        } else {
            Carriage::factory(4)->create();
        }
    }
}
