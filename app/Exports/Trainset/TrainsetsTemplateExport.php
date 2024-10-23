<?php

namespace App\Exports\Trainset;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TrainsetsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array {
        return [
            'name',
            'project_id',
            'project_trainset_id',
        ];
    }

    public function array(): array {
        return [
            ['Example name', 1, 1],
        ];
    }
}
