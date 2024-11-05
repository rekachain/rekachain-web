<?php

namespace App\Imports\CarriagePanel;

use App\Imports\CarriagePanel\Sheets\ProgressSheetImport;
use App\Imports\CarriagePanel\Sheets\RawMaterialSheetImport;
use App\Models\CarriagePanel;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CarriagePanelProgressMaterialImport implements withMultipleSheets 
{
    public function __construct(public CarriagePanel $carriagePanel) {}

    public function sheets(): array 
    {
        return [
            'Raw Material' => new RawMaterialSheetImport($this->carriagePanel),
            'Progress' => new ProgressSheetImport($this->carriagePanel),
        ];
    }
}