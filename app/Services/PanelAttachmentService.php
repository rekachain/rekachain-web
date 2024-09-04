<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\PanelAttachmentRepositoryInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;

class PanelAttachmentService extends BaseCrudService implements PanelAttachmentServiceInterface {
    protected function getRepositoryClass(): string {
        return PanelAttachmentRepositoryInterface::class;
    }
}
