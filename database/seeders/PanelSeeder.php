<?php

namespace Database\Seeders;

use App\Models\Panel;
use Database\Seeders\Helpers\CsvReader;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('panel');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                Panel::create($data);
            }
        } else {
            Panel::factory(1)->create();
        }
    }
}
