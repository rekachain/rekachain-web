<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\CustomAttachmentMaterial;
use App\Models\TrainsetAttachment;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;
use App\Support\Interfaces\Repositories\ProgressStepRepositoryInterface;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;

class TrainsetAttachmentService extends BaseCrudService implements TrainsetAttachmentServiceInterface
{
    public function __construct(
        protected DetailWorkerTrainsetRepositoryInterface $detailWorkerTrainsetRepository,
        protected ProgressStepRepositoryInterface $progressStepRepository,
        protected TrainsetAttachmentComponentRepositoryInterface $trainsetAttachmentComponentRepository,
        protected UserRepositoryInterface $userRepositoryInterface,
        protected DetailWorkerTrainsetServiceInterface $detailWorkerTrainsetService,
    ) {
        parent::__construct();
    }
    protected function getRepositoryClass(): string
    {
        return TrainsetAttachmentRepositoryInterface::class;
    }

    public function assignCustomAttachmentMaterial(TrainsetAttachment $trainsetAttachment, array $data): CustomAttachmentMaterial
    {
        logger($trainsetAttachment);
        return $trainsetAttachment->custom_attachment_materials()->updateOrCreate([
            'raw_material_id' => $data['raw_material_id'],
        ], [
            'qty' => $data['qty'],
        ]);
    }

    public function assignWorker(TrainsetAttachment $trainsetAttachment, array $data)
    {
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = $this->userRepositoryInterface->find($userId);
        $trainsetAttachmentComponent = $this->trainsetAttachmentComponentRepository->findFirst(['carriage_panel_component_id' => $data['carriage_panel_component_id'], 'trainset_attachment_id' => $trainsetAttachment->id]);
        if ($trainsetAttachmentComponent) {
            $workerTrainset = $this->detailWorkerTrainsetRepository->findFirst(['trainset_attachment_component_id' => $trainsetAttachmentComponent->id, 'worker_id' => $user->id]);
            if ($workerTrainset) {
                return $workerTrainset;
            }
            return $this->detailWorkerTrainsetService->create([
                'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
                'worker_id' => $user->id,
                'progress_step_id' => $this->progressStepRepository->findFirst(['progress_id' => $trainsetAttachmentComponent->carriage_panel_component->progress_id, 'step_id' => $user->step->id])->id,
                'estimated_time' => $user->step->estimated_time
            ]);
        }
    }

    public function confirmKPM(TrainsetAttachment $trainsetAttachment, $request)
    {
        if ($request['status'] == TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value) {
            $trainsetAttachment->status = TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED->value;

            $trainsetAttachment->save();

            return $trainsetAttachment;
        } else if ($request['status'] == TrainsetAttachmentStatusEnum::PENDING->value) {
            $note = $request['note'];

            $trainsetAttachment->status = TrainsetAttachmentStatusEnum::PENDING->value;

            $trainsetAttachment->attachment_notes()->create(
                [
                    "note" => $note ? $note : "",
                    "status" => TrainsetAttachmentStatusEnum::PENDING->value,
                ]
            );
            $trainsetAttachment->save();
            return $trainsetAttachment;
        }
    }

    public function assignSpvAndReceiver(TrainsetAttachment $trainsetAttachment, array $data)
    {
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
