<?php

namespace App\Exports\Carriage;

use App\Models\Carriage;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CarriagesExport implements FromCollection, WithHeadings {
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection() {
        return Carriage::all();
    }

    public function headings(): array {
        return [
            'type',
            'description',
        ];
    }
}