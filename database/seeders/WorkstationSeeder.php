<?php

namespace Database\Seeders;

use App\Models\Workstation;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class WorkstationSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('workstation');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                Workstation::create($data);
            }

            return;
        }
        $workstations = [
            [
                'workshop_id' => 1,
                'division_id' => 1,
                'name' => 'Workstation 1',
                'location' => 'Location 1',
            ],
            [
                'workshop_id' => 1,
                'division_id' => 2,
                'name' => 'Workstation 2',
                'location' => 'Location 2',
            ],
            [
                'workshop_id' => 2,
                'division_id' => 1,
                'name' => 'Workstation 3',
                'location' => 'Location 3',
            ],
            [
                'workshop_id' => 2,
                'division_id' => 2,
                'name' => 'Workstation 4',
                'location' => 'Location 4',
            ],
        ];

        foreach ($workstations as $workstation) {
            Workstation::create($workstation);
        }
    }
}
