<?php

namespace App\Exports\Step;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StepsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'progress_id',
            'name',
            'process',
            'estimated_time',
        ];
    }

    public function array(): array {
        return [
            [1, 'Example name', 'Example process', 0],
        ];
    }
}