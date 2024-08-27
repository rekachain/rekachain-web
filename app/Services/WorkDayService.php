<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\WorkDayRepositoryInterface;
use App\Support\Interfaces\Services\WorkDayServiceInterface;

class WorkDayService extends BaseCrudService implements WorkDayServiceInterface {
    protected function getRepositoryClass(): string {
        return WorkDayRepositoryInterface::class;
    }
}
