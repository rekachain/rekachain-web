<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DivisionRepositoryInterface;
use App\Support\Interfaces\Services\DivisionServiceInterface;

class DivisionService extends BaseCrudService implements DivisionServiceInterface {
    protected function getRepositoryClass(): string {
        return DivisionRepositoryInterface::class;
    }
}
