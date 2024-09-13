<?php

namespace App\Exports\Progress;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProgressTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'name',
        ];
    }

    public function array(): array {
        return [
            ['Example name'],
        ];
    }
}
