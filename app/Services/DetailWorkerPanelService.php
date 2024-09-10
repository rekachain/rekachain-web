<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;

class DetailWorkerPanelService extends BaseCrudService implements DetailWorkerPanelServiceInterface {
    protected function getRepositoryClass(): string {
        return DetailWorkerPanelRepositoryInterface::class;
    }
}