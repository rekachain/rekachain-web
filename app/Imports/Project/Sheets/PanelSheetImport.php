<?php

namespace App\Imports\Project\Sheets;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PanelSheetImport implements ToModel, WithHeadingRow 
{
    public function headingRow(): int 
    {
        return 2; 
    }

    public function model(array $row) 
    {
        // Process second sheet and others
    }
}