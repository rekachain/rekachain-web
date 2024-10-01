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

    public function assignWorker($request){
        DetailWorkerPanel::create([
            'serial_panel_id' => $request->serial_panel_id,
            'worker_id' => $request->worker_id,
            'progress_step_id' => $request->progress_step_id
        ]);
    }

    public function acceptAssign($detailWorkerPanel){
        $detailWorkerPanel = DetailWorkerPanel::find($detailWorkerPanel);
        
        $detailWorkerPanel->acceptance_status = 'accepted';

        $detailWorkerPanel->save();

        return 'accepted';
    }

    public function declineAssign($detailWorkerPanel){
        $detailWorkerPanel = DetailWorkerPanel::find($detailWorkerPanel);
        
        $detailWorkerPanel->acceptance_status = 'declined';

        $detailWorkerPanel->save();

        return 'declined';
    }
}