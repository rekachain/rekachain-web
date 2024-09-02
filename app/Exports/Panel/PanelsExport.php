<?php

namespace App\Exports\Panel;

use App\Models\Panel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PanelsExport implements FromCollection, WithHeadings {
    /**
     * Return all panels from the database.
     */
    public function collection() {
        return Panel::all();
    }

    /**
     * Return the headers for the exported file.
     */
    public function headings(): array {
        return [
            'name',
            'description',
        ];
    }
}
