<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\Component;
use App\Models\Panel;
use App\Models\Progress;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class CarriagePanelComponentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('carriage_panel_components');
        $csvData = $csvReader->getCsvData();

        // if ($csvData) {
        //     foreach ($csvData as $data) {
        //         if (Component::whereName($data['component'])->exists()) {
        //             if(Progress::where('name', 'LIKE', '%' . $data['panel_name'] . '%')->where('name', 'LIKE', '%' . $data['work_aspect'] . '%')->exists()) {
        //                 if(CarriagePanel::wherePanelId(Panel::whereName($data['panel_name'])->first()->id)->whereCarriageTrainsetId(Carriage::whereType($data['car_type'])->first()->id)->exists()) {
        //                     CarriagePanelComponent::create([
        //                         'component_id' => Component::whereName($data['component'])->first()->id,
        //                         'carriage_panel_id' => CarriagePanel::wherePanelId(Panel::whereName($data['panel_name'])->first()->id)
        //                             ->whereCarriageTrainsetId(Carriage::whereType($data['car_type'])->first()->id)
        //                             ->first()->id,
        //                         'progress_id' => Progress::where('name', 'LIKE', '%' . $data['panel_name'] . '%')
        //                             ->where('name', 'LIKE', '%' . $data['work_aspect'] . '%')
        //                             ->first()->id,
        //                     ]);
        //                 } else {
        //                     CarriagePanel::factory()->create([
        //                         'progress_id' => Component::whereName($data['component'])->first()->progress_id,
        //                         'carriage_trainset_id' => Carriage::whereType($data['car_type'])->first()->id,
        //                         'panel_id' => Panel::whereName($data['panel_name'])->first()->id
        //                     ]);
        //                 }
        //             } else {
        //                 Progress::factory()->create(['name' => $data['panel_name'] . ' - ' . $data['work_aspect']]);
        //             }
        //         } else {
        //             Component::factory()->create(['name' => $data['component']]);
        //         }
        //     }
        // }
        
        foreach (CarriagePanel::all() as $carriagePanel) {
            for($i=0; $i < rand(3,8); $i++) {
                CarriagePanelComponent::factory()->create([
                    'carriage_panel_id' => $carriagePanel->id,
                    'qty' => 1,
                ]);
            }
        }
    }
}
