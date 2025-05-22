<?php

namespace App\Services;

use App\Models\ProductProblemAnalysis;
use App\Support\Interfaces\Repositories\ProductProblemAnalysisRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemAnalysisServiceInterface;

class ProductProblemAnalysisService extends BaseCrudService implements ProductProblemAnalysisServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemAnalysisRepositoryInterface::class;
    }

    public function getAnalysisDetails(ProductProblemAnalysis $productProblemAnalysis) {
        $component = $this->componentService()->find(['name' => $productProblemAnalysis->component_name])->first();
        $problem = [
            'component_name' => $component->name,
            'component_description' => $component->description ?? '',
            'vendor_name' => $component->vendor_name,
            'notes' => $component->product_problems->flatMap(function ($problem) {
                return $problem->product_problem_notes->map(function ($note) {
                    return $note->note;
                });
            })->unique()->values(),
        ];
        return collect($productProblemAnalysis->toArray())
            ->merge(['product_problem' => $problem]);
    }
}
