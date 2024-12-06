<?php

namespace App\Repositories;

use App\Models\PanelAttachmentHandler;
use App\Support\Interfaces\Repositories\PanelAttachmentHandlerRepositoryInterface;

class PanelAttachmentHandlerRepository extends BaseRepository implements PanelAttachmentHandlerRepositoryInterface {
    protected function getModelClass(): string {
        return PanelAttachmentHandler::class;
    }
}
