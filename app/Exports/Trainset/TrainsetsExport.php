<?php

namespace App\Exports\Trainset;

use App\Models\Trainset;
use Maatwebsite\Excel\Concerns\FromCollection;

class TrainsetsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Trainset::all();
    }

    public function headings(): array {
        return [
            'name',
            'project_id',
            'project_trainset_id',
        ];
    }
}