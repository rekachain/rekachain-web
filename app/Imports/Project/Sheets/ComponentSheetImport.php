<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\Component;
use App\Models\Panel;
use App\Models\Trainset;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ComponentSheetImport implements ToModel, WithHeadingRow 
{
    public function __construct(private ProjectsImport $parent) { }
    
    public function model(array $row) 
    {
        // logger(array_keys($row));
        $component = Component::firstOrCreate([
            'name' => $row['nama'],
            'description' => $row['deskripsi'],
        ]);
        $panel = Panel::whereName($row['panel'])->first();
        $carriage = Carriage::whereType($row['tipe_gerbong'])->first();
        $trainsets = Trainset::whereProjectId($this->parent->getProject()->id)->get();
        $trainsets->each(function ($trainset) use ($component, $panel, $carriage, $row) {
            $carriageTrainsets = $trainset->carriage_trainsets;
            $carriageTrainsets->each(function ($carriageTrainset) use ($component, $panel, $carriage, $row) {
                if ($carriageTrainset->carriage_id == $carriage->id) {
                    $carriagePanels = $carriageTrainset->carriage_panels;
                    $carriagePanels->each(function ($carriagePanel) use ($component, $panel, $row) {
                        if ($carriagePanel->panel_id == $panel->id) {
                            $carriagePanel->carriage_panel_components()->create([
                                'component_id' => $component->id,
                                'qty' => $row['qty'],
                            ]);
                        }
                    });
                }
            });
        });
    }
}