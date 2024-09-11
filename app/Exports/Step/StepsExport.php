<?php

namespace App\Exports\Step;

use App\Models\Step;
use Maatwebsite\Excel\Concerns\FromCollection;

class StepsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Step::all();
    }

    public function headings(): array {
        return [
            'progress_id',
            'name',
            'process',
            'estimated_time',
        ];
    }
    
}