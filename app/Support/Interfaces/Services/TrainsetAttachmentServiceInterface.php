<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CustomAttachmentMaterial;
use App\Models\TrainsetAttachment;

interface TrainsetAttachmentServiceInterface extends BaseCrudServiceInterface {
    public function assignCustomAttachmentMaterial(TrainsetAttachment $trainsetAttachment, array $data): CustomAttachmentMaterial;

    public function assignWorker(TrainsetAttachment $trainsetAttachment, array $data);

    public function confirmKPM(TrainsetAttachment $trainsetAttachment, $request);

    public function assignSpvAndReceiver(TrainsetAttachment $trainsetAttachment, array $data);
    
    public function assignHandler(TrainsetAttachment $trainsetAttachment, array $data);
}