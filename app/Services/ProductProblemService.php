<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;

class ProductProblemService extends BaseCrudService implements ProductProblemServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemRepositoryInterface::class;
    }
}