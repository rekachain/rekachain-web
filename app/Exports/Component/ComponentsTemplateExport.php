<?php

namespace App\Exports\Component;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ComponentsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'name',
            'progress_id',
        ];
    }

    public function array(): array {
        return [
            ['Example Component Name', 1],
        ];
    }
}
