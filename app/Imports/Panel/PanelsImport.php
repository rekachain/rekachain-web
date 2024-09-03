<?php

namespace App\Imports\Panel;

use App\Models\Panel;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PanelsImport implements ToModel, WithHeadingRow {
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        return new Panel([
            'name' => $row['name'],
            'description' => $row['description'],
        ]);
    }
}
