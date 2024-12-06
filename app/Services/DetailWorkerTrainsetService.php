<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;

class DetailWorkerTrainsetService extends BaseCrudService implements DetailWorkerTrainsetServiceInterface {
    use HandlesImages;

    public function __construct(
        protected FailedComponentManufactureServiceInterface $failedComponentManufactureService,
        protected TrainsetAttachmentComponentServiceInterface $trainsetAttachmentComponentService,
    ) {
        parent::__construct();
    }

    protected string $imagePath = 'detail_worker_trainsets/acceptWork';

    protected function getRepositoryClass(): string {
        return DetailWorkerTrainsetRepositoryInterface::class;
    }

    public function rejectWork(DetailWorkerTrainset $detailWorkerTrainset, array $data) {
        $data['work_status'] = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;
        $data['failed_note'] = $data['notes'];

        $detailWorkerTrainset = $this->update($detailWorkerTrainset, $data);

        return $detailWorkerTrainset->fresh()->load('failed_component_manufactures');
    }

    public function createFailedComponentManufacture(DetailWorkerTrainset $detailWorkerTrainset, array $data) {
        $detailWorkerTrainset->trainset_attachment_component()->update([
            'total_failed' => $detailWorkerTrainset->trainset_attachment_component->total_failed + $data['total_failed'],
            'total_current_work_progress' => $detailWorkerTrainset->trainset_attachment_component->total_current_work_progress - $data['total_failed'],
        ]);

        return $this->failedComponentManufactureService->create([
            'detail_worker_trainset_id' => $detailWorkerTrainset->id,
            'notes' => $data['failed_note'] ?? $data['notes'],
            'total_failed' => $data['total_failed'],
        ]);
    }

    public function requestAssign($detailWorkerTrainset, $request) {

        $detailWorkerTrainset->acceptance_status = $request->acceptance_status;

        $detailWorkerTrainset->save();

        return $detailWorkerTrainset;
    }

    public function updateAndAcceptWorkWithImage($detailWorkerTrainset, array $data): ?Model {
        $data['work_status'] = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;

        $detailWorkerTrainset = $this->update($detailWorkerTrainset, $data);

        return $detailWorkerTrainset->fresh();
    }

    public function update($detailWorkerTrainset, array $data): ?Model {
        $data = $this->handleImageUpload($data, $detailWorkerTrainset);

        if (is_null($detailWorkerTrainset->acceptance_status)
            && array_key_exists('work_status', $data)
            && $data['work_status'] == DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value
        ) {
            $data['acceptance_status'] = DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value;
        }

        $detailWorkerTrainset = parent::update($detailWorkerTrainset, $data);

        if (array_key_exists('failed_note', $data)) {
            $this->createFailedComponentManufacture($detailWorkerTrainset, $data);
            $this->trainsetAttachmentComponentService->checkProgressFulfillment($detailWorkerTrainset->trainset_attachment_component);

            return $detailWorkerTrainset->fresh()->load('failed_component_manufactures');
        }

        $this->trainsetAttachmentComponentService->checkProgressFulfillment($detailWorkerTrainset->trainset_attachment_component);

        return $detailWorkerTrainset->fresh();
    }
}
