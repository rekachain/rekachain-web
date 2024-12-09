<?php

namespace App\Repositories;

use App\Models\PanelAttachment;
use App\Support\Interfaces\Repositories\PanelAttachmentRepositoryInterface;

class PanelAttachmentRepository extends BaseRepository implements PanelAttachmentRepositoryInterface {
    protected function getModelClass(): string {
        return PanelAttachment::class;
    }
}
