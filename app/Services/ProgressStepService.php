<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProgressStepRepositoryInterface;
use App\Support\Interfaces\Services\ProgressStepServiceInterface;

class ProgressStepService extends BaseCrudService implements ProgressStepServiceInterface {
    protected function getRepositoryClass(): string {
        return ProgressStepRepositoryInterface::class;
    }
}
