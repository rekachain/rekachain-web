<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;

class TrainsetAttachmentComponentService extends BaseCrudService implements TrainsetAttachmentComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentComponentRepositoryInterface::class;
    }
}
