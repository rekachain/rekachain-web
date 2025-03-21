<?php

namespace App\Repositories;

use App\Models\ReplacementStock;
use App\Support\Interfaces\Repositories\ReplacementStockRepositoryInterface;

class ReplacementStockRepository extends BaseRepository implements ReplacementStockRepositoryInterface {
    protected function getModelClass(): string {
        return ReplacementStock::class;
    }
}