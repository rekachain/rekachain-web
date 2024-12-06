<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;

class TrainsetAttachmentComponentService extends BaseCrudService implements TrainsetAttachmentComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentComponentRepositoryInterface::class;
    }

    public function checkProgressFulfillment(TrainsetAttachmentComponent $trainsetAttachmentComponent): void {
        logger('Checking progress fulfillment for trainset attachment component ' . $trainsetAttachmentComponent);
        $lastProgressStep = $trainsetAttachmentComponent->progress_steps->last();
        $lastDetailWorkerTrainset = $trainsetAttachmentComponent->detail_worker_trainsets->last();
        if ($lastProgressStep && $lastDetailWorkerTrainset
            && $lastDetailWorkerTrainset->progress_step_id == $lastProgressStep->id
            && $lastDetailWorkerTrainset->work_status == DetailWorkerTrainsetWorkStatusEnum::COMPLETED
        ) {
            $totalFulfilled = $trainsetAttachmentComponent->total_current_work_progress;
            $totalRequired = $trainsetAttachmentComponent->total_required;
            $totalRequired -= $totalFulfilled;
            $trainsetAttachmentComponent->update([
                'total_required' => $totalRequired,
                'total_fulfilled' => $trainsetAttachmentComponent->total_fulfilled + $totalFulfilled,
                'total_current_work_progress' => 0,
            ]);
        }
        $trainsetAttachmentService = app(TrainsetAttachmentServiceInterface::class);
        $trainsetAttachmentService->checkProgressAttachment($trainsetAttachmentComponent->trainset_attachment);
    }
}
