<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\Component;
use App\Models\ReturnedProduct;
use App\Support\Enums\ProductProblemStatusEnum;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductProblemSheetImport implements ToModel, WithHeadingRow {
    public function __construct(protected string $userId, private ?ReturnedProduct $returnedProduct = null) {}

    public function model(array $row) {
        $returnedProduct = $this->returnedProduct ?? ReturnedProduct::whereSerialNumber($row['serial_number'])->get()->last();

        $productProblem = $returnedProduct->product_problems()->create([
            'component_id' => Component::firstOrCreate([
                'name' => $row['problem_component_name'],
            ])->id,
            'status' => match ($row['status']) {
                'Diganti' => ProductProblemStatusEnum::CHANGED,
                'Diperbaiki' => ProductProblemStatusEnum::FIXED,
                default => ProductProblemStatusEnum::PROGRESS,
            },
        ]);

        $productProblem->product_problem_notes()->create([
            'user_id' => $this->userId,
            'note' => $row['note'],
        ]);

        return $returnedProduct;
    }
}
