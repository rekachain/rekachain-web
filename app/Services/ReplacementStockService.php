<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ReplacementStockRepositoryInterface;
use App\Support\Interfaces\Services\ReplacementStockServiceInterface;

class ReplacementStockService extends BaseCrudService implements ReplacementStockServiceInterface {
    protected function getRepositoryClass(): string {
        return ReplacementStockRepositoryInterface::class;
    }
}