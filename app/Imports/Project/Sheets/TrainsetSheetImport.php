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
        $project = $this->parent->getProject();
        $topHeaders = $rows[1];
        $carTypeHeaders = $rows[2];

        $rows->skip(3)->each(function ($row) use ($project, $topHeaders, $carTypeHeaders) {
            $nameColumn = $topHeaders->search('Nama');
            $presetColumn = $topHeaders->search('Preset');

            if (empty($row[$presetColumn]) || empty($row[$nameColumn])) {
                return;
            }

            $trainsetData = [
                'project_id' => $project->id,
                'name' => $row[$nameColumn],
                'status' => TrainsetStatusEnum::DRAFT->value,
            ];

            if ($row[$presetColumn] != 'Custom') {
                $preset = $this->parent->getPresets()->firstWhere('name', $row[$presetColumn]);
                $trainsetData['preset_trainset_id'] = $preset->id;
                $trainset = Trainset::create($trainsetData);
                $this->parent->addTrainset($trainset);

                $carriagePresets = $this->parent->getCarriagePresets()->where('preset_trainset_id', $preset->id);
                $carriagePresets->each(function ($preset) use ($trainset) {
                    $trainset->carriage_trainsets()->create([
                        'trainset_id' => $trainset->id,
                        'carriage_id' => $preset->carriage_id,
                        'qty' => $preset->qty,
                    ]);
                });
            } else {
                $trainset = Trainset::create($trainsetData);
                $this->parent->addTrainset($trainset);

                $carriageTrainset = $carTypeHeaders->filter()->mapWithKeys(function ($header, $index) use ($row) {
                    return [$header => $row[$index]];
                });

                $carriageTrainset->each(function ($qty, $type) use ($trainset) {
                    if ($qty != 0) {
                        $carriage = $this->parent->getCarriages()->firstWhere('type', $type);
                        $trainset->carriage_trainsets()->create([
                            'trainset_id' => $trainset->id,
                            'carriage_id' => $carriage->id,
                            'qty' => $qty,
                        ]);
                    }
                });
            }
        });
    }
}
