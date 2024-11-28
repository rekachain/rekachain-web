<?php

namespace App\Imports\Project;

use App\Imports\Project\Sheets\CarriageSheetImport;
use App\Imports\Project\Sheets\ComponentSheetImport;
use App\Imports\Project\Sheets\PanelSheetImport;
use App\Imports\Project\Sheets\PresetTrainsetSheetImport;
use App\Imports\Project\Sheets\ProjectSheetImport;
use App\Imports\Project\Sheets\TrainsetSheetImport;
use App\Models\Carriage;
use App\Models\CarriagePreset;
use App\Models\Panel;
use App\Models\PresetTrainset;
use App\Models\Trainset;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProjectsImport implements WithMultipleSheets {
    private $project;
    private Collection $carriages;
    private Collection $presets;
    private Collection $carriagePresets;
    private Collection $trainsets;
    private Collection $panels;

    public function __construct(public UploadedFile $file) {
        $this->carriages = collect();
        $this->presets = collect();
        $this->carriagePresets = collect();
        $this->trainsets = collect();
        $this->panels = collect();
    }

    public function sheets(): array {
        return [
            'Proyek' => new ProjectSheetImport($this),
            'Gerbong' => new CarriageSheetImport($this),
            'Preset Trainset' => new PresetTrainsetSheetImport($this),
            'Trainset' => new TrainsetSheetImport($this),
            'Panel' => new PanelSheetImport($this),
            'Komponen' => new ComponentSheetImport($this),
        ];
    }

    public function setProject($project) {
        $this->project = $project;
    }

    public function getProject() {
        return $this->project;
    }

    public function getFile() {
        return $this->file;
    }

    public function addCarriage(Carriage $carriage) {
        if (!$this->carriages->contains($carriage)) {
            $this->carriages->add($carriage);
        }
    }

    public function getCarriages() {
        return $this->carriages;
    }

    public function addPreset(PresetTrainset $carriage) {
        if (!$this->presets->contains($carriage)) {
            $this->presets->add($carriage);
        }
    }

    public function getPresets() {
        return $this->presets;
    }

    public function addCarriagePreset(CarriagePreset $carriagePreset) {
        if (!$this->carriagePresets->contains($carriagePreset)) {
            $this->carriagePresets->add($carriagePreset);
        }
    }

    public function getCarriagePresets() {
        return $this->carriagePresets;
    }

    public function addTrainset(Trainset $trainset) {
        if (!$this->trainsets->contains($trainset)) {
            $this->trainsets->add($trainset);
        }
    }

    public function getTrainsets() {
        return $this->trainsets;
    }

    public function addPanel(Panel $panel) {
        if (!$this->panels->contains($panel)) {
            $this->panels->add($panel);
        }
    }

    public function getPanels() {
        return $this->panels;
    }
}
