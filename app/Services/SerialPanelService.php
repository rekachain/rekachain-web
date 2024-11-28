<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\SerialPanel;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;
use App\Support\Interfaces\Repositories\ProgressStepRepositoryInterface;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\UserServiceInterface;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    public function __construct(
        protected DetailWorkerPanelRepositoryInterface $detailWorkerPanelRepository,
        protected ProgressStepRepositoryInterface $progressStepRepository,
        protected UserServiceInterface $userService,
        protected UserRepositoryInterface $userRepository,
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
    ) {
        parent::__construct();
    }

    public function assignWorker(SerialPanel $serialPanel, array $data) {
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = $this->userService->find(['id' => $userId])->first();
        $workerPanel = $this->detailWorkerPanelRepository->findFirst(['serial_panel_id' => $serialPanel->id, 'worker_id' => $user->id]);
        if ($workerPanel) {
            return $workerPanel;
        }

        return $this->detailWorkerPanelService->create([
            'serial_panel_id' => $serialPanel->id,
            'worker_id' => $user->id,
            'progress_step_id' => $this->progressStepRepository->findFirst(['progress_id' => $serialPanel->panel_attachment->carriage_panel->progress_id, 'step_id' => $user->step->id])->id,
            'estimated_time' => $user->step->estimated_time,
        ]);
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->detail_worker_panels()->each(function ($detailWorkerPanel) {
            $this->detailWorkerPanelService->delete($detailWorkerPanel);
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
