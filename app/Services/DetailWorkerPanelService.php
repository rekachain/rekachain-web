<?php

namespace App\Services;

use Throwable;
use App\Models\User;
use App\Models\SerialPanel;
use App\Models\ProgressStep;
use GuzzleHttp\Promise\Create;
use App\Models\DetailWorkerPanel;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;

class DetailWorkerPanelService extends BaseCrudService implements DetailWorkerPanelServiceInterface {
    protected function getRepositoryClass(): string {
        return DetailWorkerPanelRepositoryInterface::class;
    }

    public function acceptWorkWithImage($detailWorkerPanel, $request)
    {
        $detailWorkerPanel = DetailWorkerPanel::find($detailWorkerPanel);
        
        if ($request->hasFile('image_path')) {
    
            $imagePath = $request->file('image_path')->store('detail_worker_images', 'public');
    
            $detailWorkerPanel->image_path = $imagePath;
        } else {
            return response()->json(['error' => 'No image uploaded'], 400);
        }
    
        $detailWorkerPanel->work_status = DetailWorkerPanelWorkStatusEnum::COMPLETED;
        $detailWorkerPanel->save();

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
                'progress_step_id' => $progress_step->id
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