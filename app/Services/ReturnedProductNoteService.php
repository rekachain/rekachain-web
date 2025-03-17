<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ReturnedProductNoteRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductNoteServiceInterface;

class ReturnedProductNoteService extends BaseCrudService implements ReturnedProductNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return ReturnedProductNoteRepositoryInterface::class;
    }
}