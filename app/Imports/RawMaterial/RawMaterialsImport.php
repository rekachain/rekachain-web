<?php

namespace App\Imports\RawMaterial;

use App\Models\RawMaterial;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RawMaterialsImport implements ToModel , WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new RawMaterial([
            'material_code'=> $row['material_code'],
            'description'=> $row['description'],
            'unit'=> $row['unit'],
            'specs'=> $row['spec'],
        ]);
    }
}