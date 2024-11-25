<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Models\Panel;
use App\Models\Progress;
use App\Models\Trainset;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class CarriagePanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('carriage_panel');
        $csvData = $csvReader->getCsvData();
        if ($csvData) {
            foreach ($csvData as $data) {
                if (Carriage::whereType($data['car_type'])->exists()) {
                    if (Trainset::whereName($data['trainset'])->exists()) {
                        if (Panel::whereName($data['panel_name'])->exists()) {
                            if (Progress::whereId($data['progress_id'])->exists()) {
                                CarriagePanel::create([
                                    'carriage_trainset_id' => CarriageTrainset::whereTrainsetId(Trainset::whereName($data['trainset'])->first()->id)
                                        ->whereCarriageId(Carriage::whereType($data['car_type'])->first()->id)
                                        ->first()->id,
                                    'progress_id' => Progress::whereId($data['progress_id'])->first()->id,
                                    'panel_id' => Panel::whereName($data['panel_name'])->first()->id,
                                ]);
                            }

                            // TODO: create new progress

                        }
                        // TODO: create new panel
                    }

                    // TODO: create new trainset

                }

                // TODO: create new carriage

            }
        }
        // TODO: CarriagePanel::factory(1)->create();

    }
}
