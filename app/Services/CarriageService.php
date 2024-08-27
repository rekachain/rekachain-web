<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;

class CarriageService extends BaseCrudService implements CarriageServiceInterface {
    public function __construct(protected CarriagePanelServiceInterface $carriagePanelService, protected PanelServiceInterface $panelService) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriageRepositoryInterface::class;
    }
}
