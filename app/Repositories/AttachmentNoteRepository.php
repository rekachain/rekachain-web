<?php

namespace App\Repositories;

use App\Models\AttachmentNote;
use App\Support\Interfaces\Repositories\AttachmentNoteRepositoryInterface;

class AttachmentNoteRepository extends BaseRepository implements AttachmentNoteRepositoryInterface {
    protected function getModelClass(): string {
        return AttachmentNote::class;
    }
}
