<?php

namespace App\Exports\ReplacementStock;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ReplacementStocksTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    public function headings(): array {
        return [
            'Nama Komponen',
            'Threshold',
            'Jumlah',
        ];
    }

    public function array(): array {
        return [
            ['Example Component Name', 1, 1],
        ];
    }
}
