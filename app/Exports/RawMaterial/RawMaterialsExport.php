<?php

namespace App\Exports\RawMaterial;

use App\Models\RawMaterial;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RawMaterialsExport implements FromCollection, WithHeadings {
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection() {
        return RawMaterial::all();
    }

    public function headings(): array {
        return [
            'material_code',
            'description',
            'unit',
            'specs',
        ];
    }
}
