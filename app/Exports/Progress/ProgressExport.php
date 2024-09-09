<?php

namespace App\Exports\Progress;

use App\Models\Progress;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProgressExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Progress::all();
    }

    public function headings(): array {
        return [
            'name',
        ];
    }
}