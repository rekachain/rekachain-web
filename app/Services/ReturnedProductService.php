<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ReturnedProductRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;

class ReturnedProductService extends BaseCrudService implements ReturnedProductServiceInterface {
    protected function getRepositoryClass(): string {
        return ReturnedProductRepositoryInterface::class;
    }
}