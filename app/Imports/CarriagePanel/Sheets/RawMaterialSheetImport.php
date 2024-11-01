<?php

namespace App\Imports\CarriagePanel\Sheets;

use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
use App\Models\RawMaterial;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RawMaterialSheetImport implements ToModel, WithHeadingRow 
{
    private $existedMaterialCodes = [];
    
    public function __construct(private CarriagePanel $carriagePanel) {}

    public function model(array $row) 
    {
        $rawMaterial = RawMaterial::whereMaterialCode($row['kode_material'])->first();
        if (is_null($rawMaterial)) {
            $rawMaterial = RawMaterial::create([
                'material_code' => $row['kode_material'],
                'description' => $row['deskripsi'],
                'specs' => $row['spesifikasi'],
                'unit' => $row['unit'],
            ]);
        } else {
            $this->existedMaterialCodes[] = $rawMaterial->material_code;
        }
        return PanelMaterial::create([
            'carriage_panel_id' => $this->carriagePanel->id,
            'raw_material_id' => $rawMaterial->id,
            'qty' => $row['qty'],
        ]);
    }
}
