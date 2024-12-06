<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\PanelAttachmentHandlerRepositoryInterface;
use App\Support\Interfaces\Services\PanelAttachmentHandlerServiceInterface;

class PanelAttachmentHandlerService extends BaseCrudService implements PanelAttachmentHandlerServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelAttachmentHandlerRepositoryInterface::class;
    }
}
