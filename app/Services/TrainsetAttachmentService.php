<?php

namespace App\Services;

use App\Models\User;
use App\Models\ProgressStep;
use App\Models\AttachmentNote;
use App\Models\TrainsetAttachment;
use App\Models\DetailWorkerTrainset;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;

class TrainsetAttachmentService extends BaseCrudService implements TrainsetAttachmentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentRepositoryInterface::class;
    }

    public function assignWorker(TrainsetAttachment $trainsetAttachment, array $data) {
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = User::find($userId);
        $trainsetAttachmentComponent = TrainsetAttachmentComponent::find(['carriage_panel_component_id' => $data['carriage_panel_component_id'], 'trainset_attachment_id' => $trainsetAttachment->id])->first();
        if ($trainsetAttachmentComponent) {
            return DetailWorkerTrainset::create([
                'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
                'worker_id' => $user->id,
                'progress_step_id' => ProgressStep::whereProgressId($trainsetAttachmentComponent->carriage_panel_component->progress_id)->whereStepId($user->step->id)->first()->id,
                'estimated_time' => $user->step->estimated_time
            ]);
        }
    }

    public function confirmKPM(TrainsetAttachment $trainsetAttachment, $request)
    {   
        if ($request['status'] == TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value){
            $trainsetAttachment->status = TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value;
        
            $trainsetAttachment->save();

            return $trainsetAttachment;
        }else if ($request['status'] == TrainsetAttachmentStatusEnum::PENDING->value) {
            $note = $request['note'];
            
            $trainsetAttachment->status = TrainsetAttachmentStatusEnum::PENDING->value;
            
            $trainsetAttachment->attachment_notes()->create(
                [
                    "note" => $note ? $note : "",
                    "status" => TrainsetAttachmentStatusEnum::PENDING->value,
                ]
            );
            return $trainsetAttachment;
        }
        
    }

    public function assignSpvAndReceiver(TrainsetAttachment $trainsetAttachment, array $data) {
        $trainsetAttachment->supervisor_id = $data['supervisor_id'] ?? auth()->user()->id;
        $attachmentHandler = [
            'handles' => TrainsetAttachmentHandlerHandlesEnum::RECEIVE->value,
        ];
        if (array_key_exists('receiver_name', $data)) {
            $attachmentHandler['handler_name'] = $data['receiver_name'];
        } else {
            $attachmentHandler['user_id'] = $data['receiver_id'];
        }
        $trainsetAttachment->trainset_attachment_handlers()->create($attachmentHandler);
        $trainsetAttachment->save();
        return $trainsetAttachment;
    }
}