<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class PresetTrainsetSheetImport implements ToCollection {
    public function __construct(private ProjectsImport $parent) {}

    public function collection(Collection $rows) {
        $project = $this->parent->getProject();
        $topHeaders = $rows[1];
        $carTypeHeaders = $rows[2];
        $rows->skip(3)->each(function ($row) use ($project, $topHeaders, $carTypeHeaders) {
            $nameColumn = $topHeaders->search('Nama');
            if ($row[$nameColumn] == null || $row[$nameColumn] == '') {
                return;
            }

            $preset = PresetTrainset::create([
                'project_id' => $project->id,
                'name' => $row[$nameColumn],
            ]);
            $this->parent->addPreset($preset);

            $carriagePresetImport = [];
            foreach ($carTypeHeaders->filter() as $index => $header) {
                $carriagePresetImport[$header] = $row[$index];
            }

            foreach ($carriagePresetImport as $key => $value) {
                if ($value != 0) {
                    $carriagePreset = CarriagePreset::create([
                        'preset_trainset_id' => $preset->id,
                        'carriage_id' => $this->parent->getCarriages()->firstWhere('type', $key)->id,
                        'qty' => $value,
                    ]);
                    $this->parent->addCarriagePreset($carriagePreset);
                }
            }
        });
    }
}
