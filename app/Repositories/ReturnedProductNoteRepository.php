<?php

namespace App\Repositories;

use App\Models\ReturnedProductNote;
use App\Support\Interfaces\Repositories\ReturnedProductNoteRepositoryInterface;

class ReturnedProductNoteRepository extends BaseRepository implements ReturnedProductNoteRepositoryInterface {
    protected function getModelClass(): string {
        return ReturnedProductNote::class;
    }
}