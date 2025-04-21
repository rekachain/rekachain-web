<?php

namespace App\Repositories;

use App\Models\ProductRestock;
use App\Support\Interfaces\Repositories\ProductRestockRepositoryInterface;

class ProductRestockRepository extends BaseRepository implements ProductRestockRepositoryInterface {
    protected function getModelClass(): string {
        return ProductRestock::class;
    }
}
