<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\DetailWorkerTrainset;

interface DetailWorkerTrainsetServiceInterface extends BaseCrudServiceInterface {
    public function rejectWork(DetailWorkerTrainset $detailWorkerTrainset, array $data);

    public function requestAssign($detailWorkerTrainset, $request);

    public function updateAndAcceptWorkWithImage($detailWorkerTrainset, array $data);
}
