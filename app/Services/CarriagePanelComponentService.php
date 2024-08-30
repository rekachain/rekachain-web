<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriagePanelComponentRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;

class CarriagePanelComponentService extends BaseCrudService implements CarriagePanelComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriagePanelComponentRepositoryInterface::class;
    }
}
