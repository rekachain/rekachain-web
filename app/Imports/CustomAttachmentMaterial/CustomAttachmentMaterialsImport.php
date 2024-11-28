<?php

namespace App\Imports\CustomAttachmentMaterial;

use App\Models\PanelAttachment;
use App\Models\RawMaterial;
use App\Models\TrainsetAttachment;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CustomAttachmentMaterialsImport implements ToModel, WithHeadingRow {
    public function __construct(protected Model $attachment, protected ?bool $override = null) {
        if (is_null($this->override)) {
            $attachment->custom_attachment_materials()->delete();
        }
    }

    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        if ($this->attachment instanceof PanelAttachment || $this->attachment instanceof TrainsetAttachment) {
            $rawMaterial = RawMaterial::firstOrCreate([
                'material_code' => $row['kode_material'],
            ], [
                'description' => $row['deskripsi'],
                'specs' => $row['spesifikasi'],
                'unit' => $row['unit'],
            ]);
            if (is_null($this->override)) {
                return $this->attachment->custom_attachment_materials()->create([
                    'raw_material_id' => $rawMaterial->id,
                    'qty' => $row['qty'],
                ]);
            } elseif ($this->override) {
                return $this->attachment->custom_attachment_materials()->updateOrCreate([
                    'raw_material_id' => $rawMaterial->id,
                ], [
                    'qty' => $row['qty'],
                ]);
            }

            return $this->attachment->custom_attachment_materials()->firstOrCreate([
                'raw_material_id' => $rawMaterial->id,
            ], [
                'qty' => $row['qty'],
            ]);

        }

        return null;
    }
}
