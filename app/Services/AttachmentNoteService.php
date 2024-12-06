<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\AttachmentNoteRepositoryInterface;
use App\Support\Interfaces\Services\AttachmentNoteServiceInterface;

class AttachmentNoteService extends BaseCrudService implements AttachmentNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return AttachmentNoteRepositoryInterface::class;
    }
}
