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

        $headers = $rows[2]->filter();
        $rows->skip(3)->each(function ($row) use ($project, $headers) {
            if ($row[2] == null || $row[2] == '' || $row[1] == null || $row[1] == '') {
                return;
            }
            
            if ($row[2] != 'Custom') {
                $preset = $this->parent->getPresets()->firstWhere('name', $row[2]);
                $carriagePresets = $this->parent->getCarriagePresets()->where('preset_trainset_id', $preset->id)->all();
                // logger($carriagePresets);
                $trainset = Trainset::create([
                    'project_id' => $project->id,
                    'preset_trainset_id' => $preset->id,
                    'name' => $row[1],
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
                    'name' => $row[1],
                    'status' => TrainsetStatusEnum::DRAFT->value,
                ]);
                $this->parent->addTrainset($trainset);

                $carriageTrainset = [];
                foreach ($headers as $index => $header) {
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