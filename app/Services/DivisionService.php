<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\DivisionRepositoryInterface;
use App\Support\Interfaces\DivisionServiceInterface;

class DivisionService extends BaseCrudService implements DivisionServiceInterface {
    protected function getRepositoryClass(): string {
        return DivisionRepositoryInterface::class;
    }
}
