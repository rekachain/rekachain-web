<?php

namespace App\Imports\Component;

use App\Models\Component;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ComponentsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Component([
            'name' => $row['name'],
            'progress_id' => $row['progress_id'],
        ]);
    }
}