<?php

namespace App\Repositories;

use App\Models\ProductProblemNote;
use App\Support\Interfaces\Repositories\ProductProblemNoteRepositoryInterface;

class ProductProblemNoteRepository extends BaseRepository implements ProductProblemNoteRepositoryInterface {
    protected function getModelClass(): string {
        return ProductProblemNote::class;
    }
}
