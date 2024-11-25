<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\TrainsetAttachmentHandlerRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentHandlerServiceInterface;

class TrainsetAttachmentHandlerService extends BaseCrudService implements TrainsetAttachmentHandlerServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentHandlerRepositoryInterface::class;
    }
}
