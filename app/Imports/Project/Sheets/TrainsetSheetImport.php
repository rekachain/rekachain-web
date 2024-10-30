<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;
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

        $headers = $rows[2]->filter();
        $rows->skip(3)->each(function ($row) use ($project, $headers) {
            if ($row[2] == null || $row[2] == '' || $row[1] == null || $row[1] == '') {
                return;
            }
            if ($row[2] != 'Custom') {
                $preset = PresetTrainset::whereProjectId($project->id)->whereName($row[2])->first();
                $carriagePreset = CarriagePreset::wherePresetTrainsetId($preset->id)->get();
                // logger($carriagePreset->toArray());
                $trainset = Trainset::create([
                    'project_id' => $project->id,
                    'preset_trainset_id' => $preset->id,
                    'name' => $row[1],
                    'status' => TrainsetStatusEnum::DRAFT->value,
                ]);
                foreach ($carriagePreset as $key => $value) {
                    $trainset->carriage_trainsets()->create([
                        'trainset_id' => $trainset->id,
                        'carriage_id' => $value->carriage_id,
                        'qty' => $value->qty,
                    ]);
                }
            } else {
                $trainset = Trainset::create([
                    'project_id' => $project->id,
                    'name' => $row[1],
                    'status' => TrainsetStatusEnum::DRAFT->value,
                ]);
                $carriageTrainset = [];
                foreach ($headers as $index => $header) {
                    // logger('index: ' . $index . ' header: ' . $header);
                    $carriageTrainset[$header] = $row[$index];
                }
                // logger(json_encode($carriageTrainset));
                foreach ($carriageTrainset as $key => $value) {
                    if ($value != 0) {
                        $trainset->carriage_trainsets()->create([
                            'trainset_id' => $trainset->id,
                            'carriage_id' => Carriage::whereType($key)->first()->id,
                            'qty' => $value,
                        ]);
                    }
                }
            }
        });
    }
}