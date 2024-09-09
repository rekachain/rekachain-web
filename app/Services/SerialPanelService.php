<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    protected function getRepositoryClass(): string {
        return SerialPanelRepositoryInterface::class;
    }
}
