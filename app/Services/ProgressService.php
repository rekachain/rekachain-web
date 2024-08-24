<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\ProgressRepositoryInterface;
use App\Support\Interfaces\Services\ProgressServiceInterface;

class ProgressService extends BaseCrudService implements ProgressServiceInterface {
    protected function getRepositoryClass(): string {
        return ProgressRepositoryInterface::class;
    }
}
