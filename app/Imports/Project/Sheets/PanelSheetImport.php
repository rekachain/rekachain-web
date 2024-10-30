<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\Panel;
use App\Models\Trainset;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PanelSheetImport extends ProjectsImport implements ToModel, WithHeadingRow 
{
    public function __construct(private ProjectsImport $parent) { }
    
    public function model(array $row) 
    {
        // logger(array_keys($row));
        $panel = Panel::firstOrCreate([
            'name' => $row['nama'],
            'description' => $row['deskripsi'],
        ]);
        $carriage = Carriage::whereType($row['tipe_gerbong'])->first();
        $trainsets = Trainset::whereProjectId($this->parent->getProject()->id)->get();
        $trainsets->each(function ($trainset) use ($panel, $carriage, $row) {
            $carriageTrainsets = $trainset->carriage_trainsets;
            $carriageTrainsets->each(function ($carriageTrainset) use ($panel, $carriage, $row) {
                if ($carriageTrainset->carriage_id == $carriage->id) {
                    $carriageTrainset->carriage_panels()->create([
                        'panel_id' => $panel->id,
                        'qty' => $row['jumlah_per_gerbong'],
                    ]);
                }
            });
        });
    }
}