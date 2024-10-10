<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\PendingAttachmentNoteRepositoryInterface;
use App\Support\Interfaces\Services\PendingAttachmentNoteServiceInterface;

class PendingAttachmentNoteService extends BaseCrudService implements PendingAttachmentNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return PendingAttachmentNoteRepositoryInterface::class;
    }
}