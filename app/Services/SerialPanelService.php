<?php

namespace App\Services;

use App\Models\SerialPanel;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    public function __construct(protected DetailWorkerPanelServiceInterface $detailWorkerPanelService) {
        parent::__construct();
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->detail_worker_panels()->each(function ($detailWorkerPanel) {
            $this->detailWorkerPanelService->delete($detailWorkerPanel);
        });

        return parent::delete($keyOrModel);
    }

    public function rejectPanel($serialPanel, $request){
        $data = SerialPanel::find($serialPanel->id);

        $data->manufacture_status = SerialPanelManufactureStatusEnum::FAILED->value;
        $data->notes = $request->notes;
        $data->save();
        
        return $serialPanel;
    }

    protected function getRepositoryClass(): string {
        return SerialPanelRepositoryInterface::class;
    }
}