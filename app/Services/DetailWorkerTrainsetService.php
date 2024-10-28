<?php

namespace App\Services;

use App\Models\DetailWorkerTrainset;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use App\Models\FailedComponentManufacture;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;

class DetailWorkerTrainsetService extends BaseCrudService implements DetailWorkerTrainsetServiceInterface {
    use HandlesImages;

    public function __construct(protected FailedComponentManufactureServiceInterface $failedComponentManufactureService) {
        parent::__construct();
    }

    protected string $imagePath = 'detail_worker_trainsets/acceptWork';
    
    protected function getRepositoryClass(): string {
        return DetailWorkerTrainsetRepositoryInterface::class;
    }

    public function rejectWork($detailWorkerTrainset, $data){
        $this->createFailedComponentManufacture($detailWorkerTrainset, $data);
        return $detailWorkerTrainset;
    }

    public function createFailedComponentManufacture(DetailWorkerTrainset $detailWorkerTrainset, array $data){
        return $this->failedComponentManufactureService->create([
            'detail_worker_trainset_id' => $detailWorkerTrainset->id,
            'notes' => $data['failed_note'] ?? $data['notes'],
        ]);
    }

    public function requestAssign($detailWorkerTrainset, $request){
        
        $detailWorkerTrainset->acceptance_status = $request->acceptance_status;

        $detailWorkerTrainset->save();

        return $detailWorkerTrainset;
    }

    public function updateAndAcceptWorkWithImage($detailWorkerTrainset, array $data): ?Model {
        
        $data = $this->handleImageUpload($data, $detailWorkerTrainset);

        $data['work_status'] = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;

        $detailWorkerTrainset = parent::update($detailWorkerTrainset, $data);

        return $detailWorkerTrainset;
    }

    public function update($detailWorkerTrainset, array $data): ?Model {
        $data = $this->handleImageUpload($data, $detailWorkerTrainset);
        if (array_key_exists('failed_note', $data)) {
            $this->createFailedComponentManufacture($detailWorkerTrainset, $data);
            return parent::update($detailWorkerTrainset, $data)->load('failed_component_manufactures');
        }
        return parent::update($detailWorkerTrainset, $data);
    }
}