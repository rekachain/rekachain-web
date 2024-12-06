<?php

namespace App\Repositories;

use App\Models\TrainsetAttachmentComponent;
use App\Support\Interfaces\Repositories\TrainsetAttachmentComponentRepositoryInterface;

class TrainsetAttachmentComponentRepository extends BaseRepository implements TrainsetAttachmentComponentRepositoryInterface {
    protected function getModelClass(): string {
        return TrainsetAttachmentComponent::class;
    }
}
