<?php

namespace App\Imports\Progress;

use App\Models\Progress;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProgressImport implements ToModel, WithHeadingRow {
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        return new Progress([
            'name' => $row['name'],
        ]);
    }
}
