<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\CarriagePanel;
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

    /**
     * @param  int|CarriagePanel  $keyOrModel
     *
     * @throws \Exception
     */
    public function delete($keyOrModel): bool {
        $keyOrModel->carriage_panel_components()->each(function ($component) {
            $this->carriagePanelComponentService->delete($component);
        });

        // TODO: update trainset_preset_id to null

        return parent::delete($keyOrModel);
    }
}
