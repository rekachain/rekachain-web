<?php

namespace App\Imports\Project\Sheets;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ComponentSheetImport implements ToModel, WithHeadingRow 
{
    public function headingRow(): int 
    {
        return 2; // Change based on your needs
    }

    public function model(array $row) 
    {
        // Process second sheet and others
    }
}