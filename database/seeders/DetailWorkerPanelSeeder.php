<?php

namespace Database\Seeders;

use App\Models\DetailWorkerPanel;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class DetailWorkerPanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('detail_worker_panel');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                DetailWorkerPanel::create($data);
            }

            return;
        }
        DetailWorkerPanel::factory(10)->create();
    }
}
