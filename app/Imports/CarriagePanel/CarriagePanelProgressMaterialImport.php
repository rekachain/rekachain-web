<?php

namespace App\Imports\CarriagePanel;

use App\Imports\CarriagePanel\Sheets\ProgressSheetImport;
use App\Imports\CarriagePanel\Sheets\RawMaterialSheetImport;
use App\Models\CarriagePanel;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CarriagePanelProgressMaterialImport implements withMultipleSheets 
{
    public function __construct(public CarriagePanel $carriagePanel, protected ?bool $override = null) {}

    public function sheets(): array 
    {
        if (is_null($this->override)) {
            $this->carriagePanel->panel_materials()->delete();
        }
        return [
            'Raw Material' => new RawMaterialSheetImport($this->carriagePanel, $this->override),
            'Progress' => new ProgressSheetImport($this->carriagePanel, $this->override),
        ];
    }
}