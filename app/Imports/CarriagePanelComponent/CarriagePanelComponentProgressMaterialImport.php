<?php

namespace App\Imports\CarriagePanelComponent;

use App\Imports\CarriagePanelComponent\Sheets\ProgressSheetImport;
use App\Imports\CarriagePanelComponent\Sheets\RawMaterialSheetImport;
use App\Models\CarriagePanelComponent;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CarriagePanelComponentProgressMaterialImport implements withMultipleSheets 
{
    public function __construct(public CarriagePanelComponent $carriagePanelComponent, public int $workAspectId) {}

    public function sheets(): array 
    {
        return [
            'Raw Material' => new RawMaterialSheetImport($this->carriagePanelComponent),
            'Progress' => new ProgressSheetImport($this->carriagePanelComponent, $this->workAspectId),
        ];
    }
}