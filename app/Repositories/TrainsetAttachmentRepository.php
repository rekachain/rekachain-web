<?php

namespace App\Repositories;

use App\Models\TrainsetAttachment;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;

class TrainsetAttachmentRepository extends BaseRepository implements TrainsetAttachmentRepositoryInterface {
    protected function getModelClass(): string {
        return TrainsetAttachment::class;
    }
}
