<?php

namespace App\Repositories;

use App\Models\ReturnedProduct;
use App\Support\Interfaces\Repositories\ReturnedProductRepositoryInterface;

class ReturnedProductRepository extends BaseRepository implements ReturnedProductRepositoryInterface {
    protected function getModelClass(): string {
        return ReturnedProduct::class;
    }
}