<?php

namespace App\Repositories;

use App\Models\TrainsetAttachmentHandler;
use App\Support\Interfaces\Repositories\TrainsetAttachmentHandlerRepositoryInterface;

class TrainsetAttachmentHandlerRepository extends BaseRepository implements TrainsetAttachmentHandlerRepositoryInterface {
    protected function getModelClass(): string {
        return TrainsetAttachmentHandler::class;
    }
}
