<?php

namespace App\Services;

use App\Models\ProgressStep;
use App\Models\SerialPanel;
use App\Models\User;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use Illuminate\Support\Facades\DB;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    public function __construct(protected DetailWorkerPanelServiceInterface $detailWorkerPanelService) {
        parent::__construct();
    }

    public function assignWorker(SerialPanel $serialPanel, array $data){
        return DB::transaction(function () use ($serialPanel, $data) {
            $userId = $data['worker_id'] ?? auth()->user()->id;
            $user = User::find($userId);
            $detailWorkerPanel = $this->detailWorkerPanelService->create([
                'serial_panel_id' => $serialPanel->id,
                'worker_id' => $user->id,
                'progress_step_id' => ProgressStep::where('progress_id', $serialPanel->panel_attachment->carriage_panel->progress_id)->where('step_id', $user->step->id)->first()->id,
                'estimate_time' => $user->step->estimate_time
            ]);
            return $detailWorkerPanel;
        });
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