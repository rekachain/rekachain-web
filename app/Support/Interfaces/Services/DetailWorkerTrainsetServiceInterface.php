<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface DetailWorkerTrainsetServiceInterface extends BaseCrudServiceInterface {
    public function rejectWork($detailWorkerTrainset, $request);
    
    public function requestAssign($detailWorkerTrainset, $request);

    public function updateAndAcceptWorkWithImage($detailWorkerTrainset, array $data);
    
}