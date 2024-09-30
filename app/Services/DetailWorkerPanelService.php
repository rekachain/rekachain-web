<?php

namespace App\Services;

use GuzzleHttp\Promise\Create;
use App\Models\DetailWorkerPanel;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;

class DetailWorkerPanelService extends BaseCrudService implements DetailWorkerPanelServiceInterface {
    protected function getRepositoryClass(): string {
        return DetailWorkerPanelRepositoryInterface::class;
    }

    public function addAssign($request){
        DetailWorkerPanel::create([
            'serial_panel_id' => $request->serial_panel_id,
            'worker_id' => $request->worker_id,
            'progress_step_id' => $request->progress_step_id
        ]);
    }
}