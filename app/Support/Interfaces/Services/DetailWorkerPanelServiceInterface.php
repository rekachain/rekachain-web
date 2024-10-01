<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface DetailWorkerPanelServiceInterface extends BaseCrudServiceInterface {
    public function assignWorker($request);
    
    public function acceptAssign($detailWorkerPanel);
    
    public function declineAssign($detailWorkerPanel);
}