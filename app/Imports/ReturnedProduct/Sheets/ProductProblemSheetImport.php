<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\ReturnedProduct;
use App\Support\Enums\ProductProblemStatusEnum;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductProblemSheetImport implements ToModel, WithHeadingRow {
    public function model(array $row) {
        $returnedProduct = ReturnedProduct::whereSerialNumber($row['serial_number'])->first();
        return $returnedProduct->product_problems()->firstOrCreate([
            'component_id' => $row['problem_component_name'],
            'status' => match ($row['status']) {
                'diganti' => ProductProblemStatusEnum::CHANGED,
                'diperbaiki' => ProductProblemStatusEnum::FIXED,
                default => ProductProblemStatusEnum::PROGRESS,
            },
        ]);
    }
}
