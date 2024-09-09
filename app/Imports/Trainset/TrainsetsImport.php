<?php

namespace App\Imports\Trainset;

use App\Models\Trainset;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TrainsetsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Trainset([
            'name' => $row['name'],
            'project_id' => $row['project_id'],
            'project_trainset_id' => $row['project_trainset_id'],
        ]);
    }
}