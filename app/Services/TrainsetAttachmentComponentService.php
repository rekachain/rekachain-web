<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;

class TrainsetAttachmentComponentService extends BaseCrudService implements TrainsetAttachmentComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentComponentRepositoryInterface::class;
    }

    public function checkProgressFulfillment(TrainsetAttachmentComponent $trainsetAttachmentComponent): void {
        logger('Checking progress fulfillment for trainset attachment component ' . $trainsetAttachmentComponent);
        $lastProgressStep = $trainsetAttachmentComponent->progress_steps->last()->load('step');
        $lastDetailWorkerTrainset = $trainsetAttachmentComponent->detail_worker_trainsets->last();
        if ($lastProgressStep && $lastDetailWorkerTrainset 
            && $lastDetailWorkerTrainset->step_id == $lastProgressStep->step_id
            && $lastProgressStep->work_status == DetailWorkerTrainsetWorkStatusEnum::COMPLETED
        ) {
            if (empty($lastDetailWorkerTrainset->image_path)) {
                $trainsetAttachmentComponent->update([
                    'total_fulfilled' => $trainsetAttachmentComponent->total_required 
                        - $trainsetAttachmentComponent->total_failed
                ]);
            } else {
                $trainsetAttachmentComponent->update([
                    'total_fulfilled' => $trainsetAttachmentComponent->total_required
                ]);
            }
        }
    }
}
