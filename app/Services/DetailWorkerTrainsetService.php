<?php

namespace App\Services;

use App\Models\DetailWorkerTrainset;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;

class DetailWorkerTrainsetService extends BaseCrudService implements DetailWorkerTrainsetServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'detail_worker_trainsets/acceptWork';
    
    protected function getRepositoryClass(): string {
        return DetailWorkerTrainsetRepositoryInterface::class;
    }

    public function requestWork($request){
           //                            
    }

    public function requestAssign($detailWorkerTrainset, $request){
        $detailWorkerTrainset = DetailWorkerTrainset::find($detailWorkerTrainset);
        
        $detailWorkerTrainset->acceptance_status = 'accepted';

        $detailWorkerTrainset->save();

        return $detailWorkerTrainset;
    }

    public function updateAndAcceptWorkWithImage($detailWorkerTrainset, array $data): ?Model {
        // Handle image upload if necessary
        $data = $this->handleImageUpload($data, $detailWorkerTrainset);

        // Update model with new data
        $detailWorkerTrainset = parent::update($detailWorkerTrainset, $data);

        // Update work status to COMPLETED
        $detailWorkerTrainset->work_status = DetailWorkerTrainsetWorkStatusEnum::COMPLETED->value;
        $detailWorkerTrainset->save();

        return $detailWorkerTrainset;
    }
}