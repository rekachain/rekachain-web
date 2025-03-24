<?php

namespace App\Imports\ReplacementStock;

use App\Models\Component;
use App\Models\ReplacementStock;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ReplacementStocksImport implements ToModel, WithHeadingRow {
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        $component = Component::firstOrCreate($row['nama_komponen']);
        return ReplacementStock::updateOrCreate([
            'component_id' => $component->id
        ], [
            'threshold' => $row['threshold'],
            'qty' => $row['jumlah'],
        ]);
    }
}
