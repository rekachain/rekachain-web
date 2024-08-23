<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\Component;
use App\Models\Panel;
use App\Models\Progress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (file_exists(base_path('database/data/component.csv'))) {
            $csvData = array_map('str_getcsv', file(base_path('database/data/component.csv')));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
            foreach ($csvData as $data) {
                if (Progress::where('name','LIKE', '%' . $data['panel_name']. '%')->where('name','LIKE', '%' . $data['work_aspect']. '%')->exists() && CarriagePanel::wherePanelId(Panel::whereName($data['panel_name'])->first()->id)->whereCarriageId(Carriage::whereType($data['car_type'])->first()->id)->exists()) {
                    Component::create([
                        'name' => $data['component'],
                        'progress_id' => Progress::where('name','LIKE', '%' . $data['panel_name']. '%')->where('name','LIKE', '%' . $data['work_aspect']. '%')->first()->id,
                        'carriage_panel_id' => CarriagePanel::wherePanelId(Panel::whereName($data['panel_name'])->first()->id)->whereCarriageId(Carriage::whereType($data['car_type'])->first()->id)->first()->id,
                    ]);
                }
            }
        }
    }
}
