<?php

namespace App\Exports\Component;

use App\Models\Component;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ComponentsExport implements FromCollection, WithHeadings 
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Component::all();
    }
    /**
     * Return the headers for the exported file.
     */
    public function headings(): array {
        return [
            'name',
            'progress_id',
        ];
    }
}