<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\SerialPanel;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;

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
        $data = SerialPanel::find($serialPanel);

        $data->manufacture_status = 'failed';
        $data->notes = $request->notes;
        $data->save();

        return 'Panel has been reject';
    }

    protected function getRepositoryClass(): string {
        return SerialPanelRepositoryInterface::class;
    }
}