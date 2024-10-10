<?php

namespace App\Services;

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

    public function assignWorker(SerialPanel $serialPanel, User $user){
        return DB::transaction(function () use ($serialPanel, $user) {
            $carriagePanelProgressStepIds = $serialPanel->panel_attachment->carriage_panel->progress->progress_steps->pluck('step_id')->toArray();
            if (!in_array($user->step->id, $carriagePanelProgressStepIds)) {
                return $serialPanel->panel_attachment->carriage_panel->progress->name.' does not have '.$user->step->name.' step';
            }
            $lastWorkerPanel = $serialPanel->detail_worker_panels()->orderBy('id', 'desc')->first();
            $lastKey = array_search($lastWorkerPanel?->progress_step->step_id ?? 0, $carriagePanelProgressStepIds);
            $currentKey = array_search($user->step->id, $carriagePanelProgressStepIds);
            if ($currentKey < $lastKey || $currentKey - $lastKey > 1) {
                return $currentKey < $lastKey ? 'Step already done🗿' : 'You are more than 1 step ahead🗿';
            }
            return 'assignin🗿';
            // return $this->detailWorkerPanelService->create([
            //     'serial_panel_id' => $serialPanel->id,
            //     'worker_id' => $user->id,
            //     'progress_step_id' => ProgressStep::where('progress_id', $serialPanel->panel_attachment->carriage_panel->progress_id)->where('step_id', $user->step->id)->first()->id,
            //     'estimate_time' => $user->step->estimate_time
            // ]);
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