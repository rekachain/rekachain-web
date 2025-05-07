<?php

namespace App\Imports\ReturnedProduct;

use App\Imports\ReturnedProduct\Sheets\ProductProblemSheetImport;
use App\Imports\ReturnedProduct\Sheets\ReturnedProductProblemSheetImport;
use App\Imports\ReturnedProduct\Sheets\ReturnedProductSheetImport;
use App\Models\ReturnedProduct;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ReturnedProductImport implements WithMultipleSheets {
    public function __construct(private ?ReturnedProduct $returnedProduct = null) {}

    public function sheets(): array {
        logger()->info("asdal");
        $isDefault = true;
        try {
            $sheets = $this->returnedProduct ? [
                'Problem Produk' => new ProductProblemSheetImport($this->returnedProduct),
            ] : [
                'Produk Retur' => new ReturnedProductSheetImport,
                'Problem Produk' => new ProductProblemSheetImport,
            ];
        } catch (\Throwable) {
            $isDefault = false;
        }
        if ($isDefault) {
            $sheets = [
                0 => new ReturnedProductProblemSheetImport,
            ];
        }

        return $sheets;
    }
}
