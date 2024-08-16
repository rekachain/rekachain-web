<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\PanelRepositoryInterface;
use App\Support\Interfaces\PanelServiceInterface;

class PanelService extends BaseCrudService implements PanelServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelRepositoryInterface::class;
    }
}
