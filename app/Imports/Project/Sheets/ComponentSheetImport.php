<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Component;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ComponentSheetImport implements ToModel, WithHeadingRow {
    public function __construct(private ProjectsImport $parent) {}

    public function model(array $row) {
        $component = Component::firstOrCreate([
            'name' => $row['nama'],
            'description' => $row['deskripsi'],
        ]);
        $panel = $this->parent->getPanels()->firstWhere('name', $row['panel']);
        $carriage = $this->parent->getCarriages()->firstWhere('type', $row['tipe_gerbong']);
        $trainsets = $this->parent->getTrainsets();
        $trainsets->each(function ($trainset) use ($component, $panel, $carriage, $row) {
            $trainset->carriage_trainsets()->each(function ($carriageTrainset) use ($component, $panel, $carriage, $row) {
                if ($carriageTrainset->carriage_id == $carriage->id) {
                    $carriageTrainset->carriage_panels()->each(function ($carriagePanel) use ($component, $panel, $row) {
                        if ($carriagePanel->panel_id == $panel->id) {
                            $carriagePanel->carriage_panel_components()->create([
                                'component_id' => $component->id,
                                'qty' => $row['jumlah_per_panel'],
                            ]);
                        }
                    });
                }
            });
        });
    }
}
