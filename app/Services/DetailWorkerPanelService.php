<?php

namespace App\Services;

use Throwable;
use App\Models\User;
use App\Models\SerialPanel;
use App\Models\ProgressStep;
use App\Models\DetailWorkerPanel;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Services\HandlesImages;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;

class DetailWorkerPanelService extends BaseCrudService implements DetailWorkerPanelServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'detail_worker_panels/acceptWork';
    
    protected function getRepositoryClass(): string {
        return DetailWorkerPanelRepositoryInterface::class;
    }

    public function updateAndAcceptWorkWithImage($detailWorkerPanel, array $data): ?Model {
        
        $data = $this->handleImageUpload($data, $detailWorkerPanel);

        $data['work_status'] = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
        
        $detailWorkerPanel = parent::update($detailWorkerPanel, $data);

        return $detailWorkerPanel;
    }

    public function assignWorker($request){
        $progress = SerialPanel::find($request->serial_panel_id)->panel_attachment->carriage_panel->progress;
        $step = User::find($request->user()->id)->step;
        $progress_step = ProgressStep::where('progress_id', $progress->id)
                                    ->where('step_id', $step->id)
                                    ->first();
                                    
        if ($progress_step){
            $detailWork = DetailWorkerPanel::create([
                'serial_panel_id' => $request->serial_panel_id,
                'worker_id' => $request->user()->id,
                'progress_step_id' => $progress_step->id,
                'estimated_time' => $step->estimated_time
            ]);

            return $detailWork;
        } else {
            return abort(400, 'Worker not identified');
        }                                    
    }

    public function requestAssign($detailWorkerPanel, $request){
        $detailWorkerPanel = DetailWorkerPanel::find($detailWorkerPanel);
        
        $detailWorkerPanel->acceptance_status = $request->acceptance_status;

        $detailWorkerPanel->save();

        return $detailWorkerPanel;
    }
}