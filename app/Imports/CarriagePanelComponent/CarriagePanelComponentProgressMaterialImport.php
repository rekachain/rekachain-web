<?php

namespace App\Imports\CarriagePanelComponent;

use App\Imports\CarriagePanelComponent\Sheets\ProgressSheetImport;
use App\Imports\CarriagePanelComponent\Sheets\RawMaterialSheetImport;
use App\Models\CarriagePanelComponent;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CarriagePanelComponentProgressMaterialImport implements withMultipleSheets 
{
    public function __construct(public CarriagePanelComponent $carriagePanelComponent, public int $workAspectId, protected ?bool $override = null) {}

    public function sheets(): array 
    {
        if (is_null($this->override)) {
            $this->carriagePanelComponent->component_materials()->delete();
        }
        return [
            'Raw Material' => new RawMaterialSheetImport($this->carriagePanelComponent, $this->override),
            'Progress' => new ProgressSheetImport($this->carriagePanelComponent, $this->workAspectId, $this->override),
        ];
    }
}