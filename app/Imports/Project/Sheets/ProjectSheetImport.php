<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Project;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMappedCells;

class ProjectSheetImport implements ToModel, WithMappedCells {
    public function __construct(private ProjectsImport $parent) {}

    public function mapping(): array {
        return [
            'name' => 'B1',
            'description' => 'B2',
            'initial_date' => 'B3',
            'estimated_start_date' => 'B4',
            'estimated_end_date' => 'B5',
            'trainset_needed' => 'B6',
        ];
    }

    public function model(array $row) {
        $project = Project::create([
            'name' => $row['name'],
            'description' => $row['description'],
            'initial_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['initial_date']),
            'estimated_start_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['estimated_start_date']),
            'estimated_end_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['estimated_end_date']),
        ]);

        $this->parent->setProject($project);

        return $project;
    }
}
