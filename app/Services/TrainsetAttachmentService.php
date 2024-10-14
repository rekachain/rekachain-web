<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\DetailWorkerTrainset;
use App\Models\ProgressStep;
use App\Models\TrainsetAttachment;
use App\Models\TrainsetAttachmentComponent;
use App\Models\User;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;

class TrainsetAttachmentService extends BaseCrudService implements TrainsetAttachmentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentRepositoryInterface::class;
    }

    public function assignWorker(TrainsetAttachment $trainsetAttachment, array $data) {
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = User::find($userId);
        logger($user);
        $trainsetAttachmentComponent = TrainsetAttachmentComponent::find(['carriage_panel_component_id' => $data['carriage_panel_component_id'], 'trainset_attachment_id' => $trainsetAttachment->id])->first();
        logger($trainsetAttachmentComponent);
        if ($trainsetAttachmentComponent) {
            return DetailWorkerTrainset::create([
                'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
                'worker_id' => $user->id,
                'progress_step_id' => ProgressStep::whereProgressId($trainsetAttachmentComponent->carriage_panel_component->progress_id)->whereStepId($user->step->id)->first()->id,
                'estimated_time' => $user->step->estimated_time
            ]);
        }
    }
}
