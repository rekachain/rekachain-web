<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use App\Models\User;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Database\Seeder;

class DetailWorkerPanelSeeder extends Seeder {
    public function __construct(protected PanelAttachmentServiceInterface $panelAttachmentService) {}

    /**
     * Run the database seeds.
     */
    public function run(): void {
        PanelAttachment::all()->each(function (PanelAttachment $panelAttachment, $panelAttachmentIndex) {
            $panelAttachmentCount = PanelAttachment::count();
            $panelAttachmentSeedBound = $panelAttachmentCount - 40;
            $randStatus = array_rand([
                PanelAttachmentStatusEnum::IN_PROGRESS->value => PanelAttachmentStatusEnum::IN_PROGRESS->value,
                // PanelAttachmentStatusEnum::PENDING->value => PanelAttachmentStatusEnum::PENDING->value,
                PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT->value => PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT->value,
                PanelAttachmentStatusEnum::MATERIAL_ACCEPTED->value => PanelAttachmentStatusEnum::MATERIAL_ACCEPTED->value,
                null => null,
            ]);
            if (!empty($randStatus)) {
                $panelAttachment->update([
                    'status' => $randStatus,
                ]);
            }
            $serialPanelsCount = $panelAttachment->serial_panels()->count();
            $serialPanels = collect();
            if ($panelAttachmentIndex < $panelAttachmentSeedBound) {
                $serialPanels = $panelAttachment->serial_panels()->get();
            } else {
                if ($panelAttachment->status != PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT
                    && $panelAttachment->status != PanelAttachmentStatusEnum::MATERIAL_ACCEPTED
                    && $panelAttachment->status != null
                ) {
                    $serialPanels = $panelAttachment->serial_panels()->limit(rand(1, $serialPanelsCount))->get();
                }
            }
            foreach ($serialPanels as $key => $serialPanel) {
                $workStatus = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
                $acceptanceStatus = DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value;
                $progressStepsCount = $panelAttachment->carriage_panel->progress->progress_steps()->count();
                if ($panelAttachmentIndex < $panelAttachmentSeedBound) {
                    $progressSteps = $panelAttachment->carriage_panel->progress->progress_steps()->get();
                } else {
                    $progressSteps = $panelAttachment->carriage_panel->progress->progress_steps()->limit(rand(1, $progressStepsCount))->get();
                }
                foreach ($progressSteps as $key => $progressStep) {
                    if ($key == $progressSteps->count() - 1) {
                        if ($panelAttachmentIndex < $panelAttachmentSeedBound) {
                            $workStatus = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
                        } else {
                            $workStatus = array_rand([
                                DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
                                DetailWorkerPanelWorkStatusEnum::COMPLETED->value => DetailWorkerPanelWorkStatusEnum::COMPLETED->value,
                            ]);
                        }
                        $acceptanceStatus = $workStatus == DetailWorkerPanelWorkStatusEnum::COMPLETED->value ? DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value : null;
                        if ($workStatus == DetailWorkerPanelWorkStatusEnum::COMPLETED->value && $progressSteps->count() == $progressStepsCount) {
                            $serialPanel->update([
                                'manufacture_status' => SerialPanelManufactureStatusEnum::COMPLETED->value,
                            ]);
                        }
                    }
                    $users = User::whereStepId($progressStep->step_id)
                        ->whereNotIn('id', $panelAttachment->detail_worker_panels()->whereWorkStatus(DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value)->pluck('worker_id')->toArray())
                        ->inRandomOrder()->take(rand(1, 3))->get();
                    if (empty($users)) {
                        break;
                    }
                    foreach ($users as $user) {
                        $serialPanel->detail_worker_panels()->create([
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id,
                            'estimated_time' => $progressStep->step->estimated_time,
                            'work_status' => $workStatus,
                            'acceptance_status' => $acceptanceStatus,
                        ]);
                    }
                }
                if ($panelAttachmentIndex < $panelAttachmentSeedBound) {
                    $this->panelAttachmentService->update($panelAttachment, [
                        'status' => PanelAttachmentStatusEnum::DONE->value,
                    ]);
                }
            }
        });
    }
}
