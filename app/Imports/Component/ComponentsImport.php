<?php

namespace App\Imports\Component;

use App\Models\Component;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ComponentsImport implements ToModel, WithHeadingRow {
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        return new Component([
            'name' => $row['name'],
            'progress_id' => $row['progress_id'],
        ]);
    }
}
