<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\ProgressRepositoryInterface;
use App\Support\Interfaces\ProgressServiceInterface;

class ProgressService extends BaseCrudService implements ProgressServiceInterface {
    protected function getRepositoryClass(): string {
        return ProgressRepositoryInterface::class;
    }
}
