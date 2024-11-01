<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Project;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMappedCells;

class ProjectSheetImport implements ToModel, WithMappedCells
{
    public function __construct(private ProjectsImport $parent) { }
    
    public function mapping(): array
    {
        return [
            'name' => 'B1',
            'initial_date' => 'B3',
            'trainset_needed' => 'B6',
        ];
    }

    public function model(array $row) 
    {
        $project = Project::create([
            'name' => $row['name'],
            'initial_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['initial_date']),
        ]);
        
        $this->parent->setProject($project);

        return $project;
    }
}