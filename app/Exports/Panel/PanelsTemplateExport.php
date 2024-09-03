<?php

namespace App\Exports\Panel;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PanelsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'name',
            'description',
        ];
    }

    public function array(): array {
        return [
            ['Example Panel Name', 'Example Description'],
        ];
    }
}
