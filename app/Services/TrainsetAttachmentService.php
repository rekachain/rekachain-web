<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;

class TrainsetAttachmentService extends BaseCrudService implements TrainsetAttachmentServiceInterface {
    protected function getRepositoryClass(): string {
        return TrainsetAttachmentRepositoryInterface::class;
    }
}
