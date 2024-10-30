<?php

namespace App\Imports\Project\Sheets;

use App\Models\Carriage;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CarriageSheetImport implements ToModel, WithHeadingRow 
{
    public function headingRow(): int 
    {
        return 2;
    }

    public function model(array $row) 
    {
        if (!is_null($row['deskripsi'])) {
            $carriage = Carriage::whereType($row['nama_tipe'])->whereDescription($row['deskripsi'])->first();
            if (!is_null($carriage)) {
                return $carriage;
            } else {
                return Carriage::create([
                    'type' => $row['nama_tipe'],
                    'description' => $row['deskripsi'],
                ]);
            }
        } else {
            $carriage = Carriage::whereType($row['nama_tipe'])->first();
            if (!is_null($carriage)) {
                return $carriage;
            } else {
                return Carriage::create([
                    'type' => $row['nama_tipe'],
                ]);
            }
        }
        
    }
}
