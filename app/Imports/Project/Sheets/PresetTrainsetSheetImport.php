<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class PresetTrainsetSheetImport implements ToCollection
{
    public function __construct(private ProjectsImport $parent) { }
    
    public function collection(Collection $rows)
    {
        $project = $this->parent->getProject();
        $headers = $rows[2]->filter();
        $rows->skip(3)->each(function ($row) use ($project, $headers) {
            if ($row[1] == null || $row[1] == '') {
                return;
            }
            
            $preset = PresetTrainset::create([
                'project_id' => $project->id,
                'name' => $row[1],
            ]);
            $this->parent->addPreset($preset);

            $carriagePresetImport = [];
            foreach ($headers as $index => $header) {
                $carriagePresetImport[$header] = $row[$index];
            }
            
            foreach ($carriagePresetImport as $key => $value) {
                if ($value != 0) {
                    $carriagePreset = CarriagePreset::create([
                        'preset_trainset_id' => $preset->id,
                        'carriage_id' => $this->parent->getCarriages()->firstWhere('type', $key)->id,
                        'qty' => $value
                    ]);
                    $this->parent->addCarriagePreset($carriagePreset);
                }
            }
        });
    }
}
