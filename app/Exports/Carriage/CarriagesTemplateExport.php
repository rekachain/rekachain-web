<?php

namespace App\Exports\Carriage;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CarriagesTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'type',
            'description',
        ];
    }

    public function array(): array {
        return [
            ['Example type', 'Example Description'],
        ];
    }
}
