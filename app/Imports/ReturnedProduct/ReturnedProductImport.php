<?php

namespace App\Imports\ReturnedProduct;

use App\Imports\ReturnedProduct\Sheets\ProductProblemSheetImport;
use App\Imports\ReturnedProduct\Sheets\ReturnedProductSheetImport;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ReturnedProductImport implements WithMultipleSheets {
    public function sheets(): array {
        return [
            'Produk Retur' => new ReturnedProductSheetImport(),
            'Problem Produk' => new ProductProblemSheetImport(),
        ];
    }
}
