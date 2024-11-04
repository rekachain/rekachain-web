<?php

namespace Database\Seeders;

use App\Models\TrainsetAttachment;
use App\Models\User;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailWorkerTrainsetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            RoleEnum::WORKER_MEKANIK->value,
            RoleEnum::WORKER_ELEKTRIK->value,
            RoleEnum::QC_MEKANIK->value,
            RoleEnum::QC_ELEKTRIK->value,
        ];
        $trainsetAttachments = TrainsetAttachment::get();

        foreach ($trainsetAttachments as $trainsetAttachment) {
            $trainsetAttachmentComponentsCount = $trainsetAttachment->trainset_attachment_components()->count();
            $trainsetAttachmentComponents = $trainsetAttachment->trainset_attachment_components()->limit(rand(1, $trainsetAttachmentComponentsCount))->get();
            if (count($trainsetAttachmentComponents) == 0) {
                continue;
            }
            foreach ($trainsetAttachmentComponents as $key => $trainsetAttachmentComponent) {
                $workStatus = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;
                $acceptanceStatus = DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value;
                $progressStepsCount = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps()->count();
                $progressSteps = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps()->limit(rand(1, $progressStepsCount))->get();
                foreach ($progressSteps as $key => $progressStep) {
                    if ($key == $progressSteps->count() - 1) {
                        $workStatus = array_rand([
                            DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
                            DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value => DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value,
                        ]);
                        $acceptanceStatus = $workStatus == DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value ? DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value : null;
                        if($workStatus == DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value && $progressSteps->count() == $progressStepsCount) {
                            $trainsetAttachmentComponent->update([
                               'total_fulfilled' => $trainsetAttachmentComponent->total_required 
                            ]);
                        }
                    }
                    $users = User::whereStepId($progressStep->step_id)->inRandomOrder()->take(rand(1, 3))->get();
                    foreach ($users as $user) {
                        $trainsetAttachmentComponent->detail_worker_trainsets()->create([
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id,
                            'estimated_time' => $progressStep->step->estimated_time,
                            'work_status' => $workStatus,
                            'acceptance_status' => $acceptanceStatus
                        ]);
                    }
                }
            }
        }
    }
}
