<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\WorkDayTimeRepositoryInterface;
use App\Support\Interfaces\Services\WorkDayTimeServiceInterface;

class WorkDayTimeService extends BaseCrudService implements WorkDayTimeServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkDayTimeRepositoryInterface::class;
    }
}
