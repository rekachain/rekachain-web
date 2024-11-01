<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Trainset;
use App\Support\Enums\TrainsetStatusEnum;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class TrainsetSheetImport implements ToCollection
{
    public function __construct(private ProjectsImport $parent) { }

    public function collection(Collection $rows)
    {
        // Retrieve the Project instance from the parent import class
        $project = $this->parent->getProject();
        $topHeaders = $rows[1];
        $carTypeHeaders = $rows[2];
        $rows->skip(3)->each(function ($row) use ($project, $topHeaders, $carTypeHeaders) {
            $nameColumn = $topHeaders->search('Nama');
            $presetColumn = $topHeaders->search('Preset');
            if ($row[$presetColumn] == null || $row[$presetColumn] == '' || $row[$nameColumn] == null || $row[$nameColumn] == '') {
                return;
            }
            
            if ($row[$presetColumn] != 'Custom') {
                $preset = $this->parent->getPresets()->firstWhere('name', $row[$presetColumn]);
                $carriagePresets = $this->parent->getCarriagePresets()->where('preset_trainset_id', $preset->id)->all();
                $trainset = Trainset::create([
                    'project_id' => $project->id,
                    'preset_trainset_id' => $preset->id,
                    'name' => $row[$nameColumn],
                    'status' => TrainsetStatusEnum::DRAFT->value,
                ]);
                $this->parent->addTrainset($trainset);

                foreach ($carriagePresets as $key => $value) {
                    $trainset->carriage_trainsets()->create([
                        'trainset_id' => $trainset->id,
                        'carriage_id' => $value->carriage_id,
                        'qty' => $value->qty,
                    ]);
                }
            } else {
                $trainset = Trainset::create([
                    'project_id' => $project->id,
                    'name' => $row[$nameColumn],
                    'status' => TrainsetStatusEnum::DRAFT->value,
                ]);
                $this->parent->addTrainset($trainset);

                $carriageTrainset = [];
                foreach ($carTypeHeaders->filter() as $index => $header) {
                    $carriageTrainset[$header] = $row[$index];
                }

                foreach ($carriageTrainset as $key => $value) {
                    if ($value != 0) {
                        $trainset->carriage_trainsets()->create([
                            'trainset_id' => $trainset->id,
                            'carriage_id' => $this->parent->getCarriages()->firstWhere('type', $key)->id,
                            'qty' => $value,
                        ]);
                    }
                }
            }
        });
    }
}