<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;

class ProductProblemService extends BaseCrudService implements ProductProblemServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemRepositoryInterface::class;
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->product_problem_notes()->delete();
        return parent::delete($keyOrModel);
    }
}
