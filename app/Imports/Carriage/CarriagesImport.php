<?php

namespace App\Imports\Carriage;

use App\Models\Carriage;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CarriagesImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Carriage([
            'type' => $row['type'],
            'description' => $row['description'],
        ]);
    }
}