<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemNoteRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemNoteServiceInterface;

class ProductProblemNoteService extends BaseCrudService implements ProductProblemNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemNoteRepositoryInterface::class;
    }
}