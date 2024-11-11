<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use App\Models\User;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class DetailWorkerPanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // $csvReader = new CsvReader('detail_worker_panel');
        // $csvData = $csvReader->getCsvData();

        // if ($csvData) {
        //     foreach ($csvData as $data) {
        //         DetailWorkerPanel::factory()->create($data);
        //     }
        //     return;
        // }


        PanelAttachment::all()->each(function (PanelAttachment $panelAttachment) {
            $panelAttachment->update([
                'status' => PanelAttachmentStatusEnum::IN_PROGRESS->value
            ]);
            $serialPanelsCount = $panelAttachment->serial_panels()->count();
            $serialPanels = $panelAttachment->serial_panels()->limit(rand(1, $serialPanelsCount))->get();
            foreach ($serialPanels as $key => $serialPanel) {
                $workStatus = DetailWorkerPanelWorkStatusEnum::COMPLETED->value;
                $acceptanceStatus = DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value;
                $progressStepsCount = $panelAttachment->carriage_panel->progress->progress_steps()->count();
                $progressSteps = $panelAttachment->carriage_panel->progress->progress_steps()->limit(rand(1, $progressStepsCount))->get();
                foreach ($progressSteps as $key => $progressStep) {
                    if ($key == $progressSteps->count() - 1) {
                        $workStatus = array_rand([
                            DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
                            DetailWorkerPanelWorkStatusEnum::COMPLETED->value => DetailWorkerPanelWorkStatusEnum::COMPLETED->value,
                        ]);
                        $acceptanceStatus = $workStatus == DetailWorkerPanelWorkStatusEnum::COMPLETED->value ? DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value : null;
                        if($workStatus == DetailWorkerPanelWorkStatusEnum::COMPLETED->value && $progressSteps->count() == $progressStepsCount) {
                            $serialPanel->update([
                                'manufacture_status' => SerialPanelManufactureStatusEnum::COMPLETED->value
                            ]);
                        }
                    }
                    $users = User::whereStepId($progressStep->step_id)->inRandomOrder()->take(rand(1, 3))->get();
                    foreach ($users as $user) {
                        $serialPanel->detail_worker_panels()->create([
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id,
                            'estimated_time' => $progressStep->step->estimated_time,
                            'work_status' => $workStatus,
                            'acceptance_status' => $acceptanceStatus
                        ]);
                    }
                }
            }
        });
    }
}
