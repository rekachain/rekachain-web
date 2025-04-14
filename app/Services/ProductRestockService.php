<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductRestockRepositoryInterface;
use App\Support\Interfaces\Services\ProductRestockServiceInterface;

class ProductRestockService extends BaseCrudService implements ProductRestockServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductRestockRepositoryInterface::class;
    }
}