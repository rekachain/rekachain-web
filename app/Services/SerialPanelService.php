<?php

namespace App\Services;

use App\Models\SerialPanel;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    public function assignWorker(SerialPanel $serialPanel, array $data) {
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = $this->userService()->find(['id' => $userId])->first();
        $workerPanel = $this->detailWorkerPanelService()->find(['serial_panel_id' => $serialPanel->id, 'worker_id' => $user->id])->first();
        if ($workerPanel) {
            return $workerPanel;
        }

        return $this->detailWorkerPanelService()->create([
            'serial_panel_id' => $serialPanel->id,
            'worker_id' => $user->id,
            'progress_step_id' => $this->progressStepService()->find(['progress_id' => $serialPanel->panel_attachment->carriage_panel->progress_id, 'step_id' => $user->step->id])->first()->id,
            'estimated_time' => $user->step->estimated_time,
        ]);
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->detail_worker_panels()->each(function ($detailWorkerPanel) {
            $this->detailWorkerPanelService()->delete($detailWorkerPanel);
        });

        return parent::delete($keyOrModel);
    }

    public function rejectPanel($serialPanel, $request) {
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
