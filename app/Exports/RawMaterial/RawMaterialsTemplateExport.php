<?php

namespace App\Exports\RawMaterial;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RawMaterialsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'material_code',
            'description',
            'unit',
            'specs',
        ];
    }

    public function array(): array {
        return [
            ['Example material_code', 'Example Description', 'Example Unit', 'Example Specs'],
        ];
    }
}
