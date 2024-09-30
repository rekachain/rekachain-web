<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface DetailWorkerPanelServiceInterface extends BaseCrudServiceInterface {
    public function addAssign($request);
}