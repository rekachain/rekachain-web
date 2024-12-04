<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\TrainsetAttachmentComponent;

interface TrainsetAttachmentComponentServiceInterface extends BaseCrudServiceInterface {
    public function checkProgressFulfillment(TrainsetAttachmentComponent $trainsetAttachmentComponent): void;
}
