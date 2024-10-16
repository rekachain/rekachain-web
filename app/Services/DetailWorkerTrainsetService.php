<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\DetailWorkerTrainset;
use App\Support\Interfaces\Repositories\DetailWorkerTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;

class DetailWorkerTrainsetService extends BaseCrudService implements DetailWorkerTrainsetServiceInterface {
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
}