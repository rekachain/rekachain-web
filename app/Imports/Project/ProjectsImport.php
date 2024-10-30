<?php

namespace App\Imports\Project;

use App\Imports\Project\Sheets\CarriageSheetImport;
use App\Imports\Project\Sheets\ComponentSheetImport;
use App\Imports\Project\Sheets\PanelSheetImport;
use App\Imports\Project\Sheets\PresetTrainsetSheetImport;
use App\Imports\Project\Sheets\ProjectSheetImport;
use App\Imports\Project\Sheets\TrainsetSheetImport;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProjectsImport implements WithMultipleSheets 
{
    private $project;
    private $file;

    public function __construct(UploadedFile $file) {
        $this->file = $file;
    }
    public function sheets(): array 
    {
        return [
            'Proyek' => new ProjectSheetImport($this),
            'Gerbong' => new CarriageSheetImport(),
            'Preset Trainset' => new PresetTrainsetSheetImport($this),
            'Trainset' => new TrainsetSheetImport($this),
            // 'Panel' => new PanelSheetImport(),
            // 'Komponen' => new ComponentSheetImport(),
        ];
    }

    public function setProject($project) 
    {
        $this->project = $project;
    }
    
    public function getProject() 
    {
        return $this->project;
    }

    public function getFile() 
    {
        return $this->file;
    }
}

