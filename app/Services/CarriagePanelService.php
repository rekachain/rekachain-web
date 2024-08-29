<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;

class CarriagePanelService extends BaseCrudService implements CarriagePanelServiceInterface {
    public function __construct(protected CarriagePanelComponentServiceInterface $carriagePanelComponentService) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriagePanelRepositoryInterface::class;
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->components()->each(function ($component) {
            $this->carriagePanelComponentService->delete($component);
        });

        // TODO: update trainset_preset_id to null

        return parent::delete($keyOrModel);
    }
}
