<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;

class CarriagePanelService extends BaseCrudService implements CarriagePanelServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriagePanelRepositoryInterface::class;
    }
}
