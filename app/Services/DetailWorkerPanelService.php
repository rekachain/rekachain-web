<?php

namespace App\Services;

use App\Models\DetailWorkerPanel;
use App\Models\ProgressStep;
use App\Models\SerialPanel;
use App\Models\User;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Interfaces\Repositories\DetailWorkerPanelRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;

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

    public function assignWorker($request) {
        $check = DetailWorkerPanel::where('worker_id', $request->user()->id)
            ->where('serial_panel_id', $request->serial_panel_id)
            ->first();

        if ($check == null) {
            $progress = SerialPanel::find($request->serial_panel_id)->panel_attachment->carriage_panel->progress;
            $step = User::find($request->user()->id)->step;
            $progress_step = ProgressStep::where('progress_id', $progress->id)
                ->where('step_id', $step->id)
                ->first();

            if ($progress_step) {
                $detailWork = DetailWorkerPanel::create([
                    'serial_panel_id' => $request->serial_panel_id,
                    'worker_id' => $request->user()->id,
                    'acceptance_status' => null,
                    'progress_step_id' => $progress_step->id,
                    'estimated_time' => $step->estimated_time,
                ]);

                return $detailWork;
            }

            return abort(400, 'Worker not identified');

        }

        return $check;

    }

    public function requestAssign($detailWorkerPanel, $request) {
        $detailWorkerPanel = DetailWorkerPanel::find($detailWorkerPanel);

        $detailWorkerPanel->acceptance_status = $request->acceptance_status;

        $detailWorkerPanel->save();

        return $detailWorkerPanel;
    }

    public function update($detailWorkerPanel, array $data): ?Model {
        $this->handleImageUpload($data, $detailWorkerPanel);

        if (is_null($detailWorkerPanel->acceptance_status)
        && array_key_exists('work_status', $data)
        && $data['work_status'] == DetailWorkerPanelWorkStatusEnum::COMPLETED->value
    ) {
        $data['acceptance_status'] = DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value;
    }

    $detailWorkerPanel = parent::update($detailWorkerPanel, $data);

    if (array_key_exists('failed_note', $data)) {
        $serialPanel = $detailWorkerPanel->serial_panel;
        $this->serialPanelService()->rejectPanel($serialPanel, (object)[
            'notes' => $data['failed_note']
        ]);

        $this->checkPanelProgressFulfillment($detailWorkerPanel->serial_panel->panel_attachment);

        return $detailWorkerPanel->fresh();
    }

    $this->checkPanelProgressFulfillment($detailWorkerPanel->serial_panel->panel_attachment);

    return $detailWorkerPanel->fresh();

    }

    public function checkPanelProgressFulfillment($panelAttachment): void {
        logger('Checking progress fulfillment for panel attachment ' . $panelAttachment->id);

        // Get the last progress step and detail worker panel
        $lastProgressStep = $panelAttachment->progress->progress_steps->last();
        $lastDetailWorkerPanel = $panelAttachment->detail_worker_panels->last();

        // Check if the last work is completed and matches the last progress step
        if ($lastProgressStep && $lastDetailWorkerPanel
            && $lastDetailWorkerPanel->progress_step_id == $lastProgressStep->id
            && $lastDetailWorkerPanel->work_status == DetailWorkerPanelWorkStatusEnum::COMPLETED
        ) {
            // Update serial panel status if needed
            foreach($panelAttachment->serial_panels as $serialPanel) {
                if ($serialPanel->manufacture_status !== SerialPanelManufactureStatusEnum::FAILED) {
                    $serialPanel->update([
                        'manufacture_status' => SerialPanelManufactureStatusEnum::COMPLETED->value
                    ]);
                }
            }
        }

        // Check overall panel attachment progress
        $this->panelAttachmentService()->checkProgressAttachment($panelAttachment);
    }

}
