<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\TrainsetAttachment;
use App\Models\User;

interface TrainsetAttachmentServiceInterface extends BaseCrudServiceInterface {
    public function assignWorker(TrainsetAttachment $trainsetAttachment, array $data);
    public function assignSpvAndReceiver(TrainsetAttachment $trainsetAttachment, array $data);
}
