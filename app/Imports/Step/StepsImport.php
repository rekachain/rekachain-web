<?php

namespace App\Imports\Step;

use App\Models\Step;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StepsImport implements ToModel, WithHeadingRow {
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        return new Step([
            'progress_id' => $row['progress_id'],
            'name' => $row['name'],
            'process' => $row['process'],
            'estimated_time' => $row['estimated_time'],
        ]);
    }
}
