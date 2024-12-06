<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\DivisionRepositoryInterface;
use App\Support\Interfaces\Services\DivisionServiceInterface;

class DivisionService extends BaseCrudService implements DivisionServiceInterface {
    protected function getRepositoryClass(): string {
        return DivisionRepositoryInterface::class;
    }
}
