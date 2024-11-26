<?php

namespace Database\Seeders;

use App\Models\TrainsetAttachment;
use App\Models\User;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Database\Seeder;

class DetailWorkerTrainsetSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        TrainsetAttachment::all()->each(function (TrainsetAttachment $trainsetAttachment, $trainsetAttachmentIndex) {
            $trainsetAttachmentCount = TrainsetAttachment::count();
            $trainsetAttachmentSeedBound = $trainsetAttachmentCount - 6;
            $randStatus = array_rand([
                TrainsetAttachmentStatusEnum::IN_PROGRESS->value => TrainsetAttachmentStatusEnum::IN_PROGRESS->value,
                // TrainsetAttachmentStatusEnum::PENDING->value => TrainsetAttachmentStatusEnum::PENDING->value,
                TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT->value => TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT->value,
                TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value => TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value,
                null => null,
            ]);
            if (!empty($randStatus)) {
                logger($randStatus);
                $trainsetAttachment->update([
                    'status' => $randStatus,
                ]);
            }
            $trainsetAttachmentComponents = collect();
            $trainsetAttachmentComponentsCount = $trainsetAttachment->trainset_attachment_components()->count();
            if ($trainsetAttachmentIndex < $trainsetAttachmentSeedBound) {
                $trainsetAttachmentComponents = $trainsetAttachment->trainset_attachment_components()->get();
            } else {
                if ($trainsetAttachment->status != TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED
                    && $trainsetAttachment->status != TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT
                    && $trainsetAttachment->status != null
                ) {
                    $trainsetAttachmentComponents = $trainsetAttachment->trainset_attachment_components()->limit(rand(1, $trainsetAttachmentComponentsCount))->get();
                }
            }

            if (count($trainsetAttachmentComponents) == 0) {
                return;
            }
            foreach ($trainsetAttachmentComponents as $key => $trainsetAttachmentComponent) {
                $workStatus = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;
                $acceptanceStatus = DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value;
                $progressStepsCount = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps()->count();
                if ($trainsetAttachmentIndex < $trainsetAttachmentSeedBound) {
                    $progressSteps = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps()->get();
                } else {
                    $progressSteps = $trainsetAttachmentComponent->carriage_panel_component->progress->progress_steps()->limit(rand(1, $progressStepsCount))->get();
                }
                foreach ($progressSteps as $key => $progressStep) {
                    if ($key == $progressSteps->count() - 1) {
                        if ($trainsetAttachmentIndex < $trainsetAttachmentSeedBound) {
                            $workStatus = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;
                        } else {
                            $workStatus = array_rand([
                                DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
                                DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value => DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value,
                            ]);
                        }
                        $acceptanceStatus = $workStatus == DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value ? DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value : null;
                        if ($workStatus == DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value && $progressSteps->count() == $progressStepsCount) {
                            $trainsetAttachmentComponent->update([
                                'total_fulfilled' => $trainsetAttachmentComponent->total_required,
                            ]);
                        }
                    }
                    $users = User::whereStepId($progressStep->step_id)
                        ->whereNotIn('id', $trainsetAttachment->detail_worker_trainsets()->whereWorkStatus(DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value)->pluck('worker_id')->toArray())
                        ->inRandomOrder()->take(rand(1, 3))->get();
                    foreach ($users as $user) {
                        $trainsetAttachmentComponent->detail_worker_trainsets()->create([
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id,
                            'estimated_time' => $progressStep->step->estimated_time,
                            'work_status' => $workStatus,
                            'acceptance_status' => $acceptanceStatus,
                        ]);
                    }
                }
                if ($trainsetAttachmentIndex < $trainsetAttachmentSeedBound) {
                    $trainsetAttachment->update([
                        'status' => TrainsetAttachmentStatusEnum::DONE->value,
                    ]);
                }
            }
        });
    }
}
