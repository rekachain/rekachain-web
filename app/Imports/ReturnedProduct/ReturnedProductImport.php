<?php

namespace App\Imports\ReturnedProduct;

use App\Imports\ReturnedProduct\Sheets\ProductProblemSheetImport;
use App\Imports\ReturnedProduct\Sheets\ReturnedProductSheetImport;
use App\Models\ReturnedProduct;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ReturnedProductImport implements WithMultipleSheets {
    public function __construct(protected string $userId, private ?ReturnedProduct $returnedProduct = null) {}

    public function sheets(): array {
        $sheets = $this->returnedProduct ? [
            'Problem Produk' => new ProductProblemSheetImport($this->userId, $this->returnedProduct),
        ] : [
            'Produk Retur' => new ReturnedProductSheetImport($this->userId),
            'Problem Produk' => new ProductProblemSheetImport($this->userId),
        ];
        return $sheets;
    }
}
