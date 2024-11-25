<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CarriageSheetImport implements ToModel, WithHeadingRow {
    public function __construct(public ProjectsImport $parent) {}

    public function headingRow(): int {
        return 2;
    }

    public function model(array $row) {
        if (empty($row['nama_tipe']) || $row['nama_tipe'] == '' || $row['nama_tipe'] == null) {
            return;
        }
        if (!is_null($row['deskripsi'])) {
            $carriage = Carriage::firstOrCreate([
                'type' => $row['nama_tipe'],
                'description' => $row['deskripsi'],
            ]);
            $this->parent->addCarriage($carriage);
        } else {
            $carriage = Carriage::firstOrCreate([
                'type' => $row['nama_tipe'],
            ]);
            $this->parent->addCarriage($carriage);
        }
    }
}
