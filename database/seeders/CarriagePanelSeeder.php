<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Models\Panel;
use App\Models\Progress;
use Illuminate\Database\Seeder;

class CarriagePanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        if (file_exists(base_path('database/data/carriage_panel.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/carriage_panel.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            // CarriagePanel::insert($csvData);
            foreach ($csvData as $data) {
                if (Carriage::whereType($data['car_type'])->exists()) {
                    if (Panel::whereName($data['panel_name'])->exists()) {
                        if (Progress::whereId($data['progress_id'])->exists()) {
                            CarriagePanel::create([
                                'carriage_trainset_id' => CarriageTrainset::whereCarriageId(Carriage::whereType($data['car_type'])->first()->id)->first()->id,
                                'progress_id' => Progress::whereId($data['progress_id'])->first()->id,
                                'panel_id' => Panel::whereName($data['panel_name'])->first()->id,
                            ]);
                        }

                        // TODO: create new progress

                    }

                    // TODO: create new panel

                }

                // TODO: create new carriage

            }
        }
        // TODO: CarriagePanel::factory(1)->create();

    }
}
