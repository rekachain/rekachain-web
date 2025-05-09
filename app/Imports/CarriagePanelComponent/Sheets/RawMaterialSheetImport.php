<?php

namespace App\Imports\CarriagePanelComponent\Sheets;

use App\Models\CarriagePanelComponent;
use App\Models\RawMaterial;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RawMaterialSheetImport implements ToModel, WithHeadingRow {
    private $existedMaterialCodes = [];

    public function __construct(
        private CarriagePanelComponent $carriagePanelComponent,
        protected ?bool $override = null
    ) {}

    public function model(array $row) {
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
        if (is_null($this->override)) {
            // create new after deletion on call
            return $this->carriagePanelComponent->component_materials()->create([
                'raw_material_id' => $rawMaterial->id,
                'qty' => $row['qty'],
            ]);
        } elseif ($this->override) {
            // update or create by default
            return $this->carriagePanelComponent->component_materials()->updateOrCreate([
                'raw_material_id' => $rawMaterial->id,
            ], [
                'qty' => $row['qty'],
            ]);
        } elseif (!$this->override) {
            // create only when not existed
            return $this->carriagePanelComponent->component_materials()->firstOrCreate([
                'raw_material_id' => $rawMaterial->id,
            ], [
                'qty' => $row['qty'],
            ]);
        }
    }
}
