<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum ProductRestockStatusEnum: string {
    use Arrayable, Translatable;

    case DRAFT = 'draft';
    case REQUESTED = 'requested';
    case INITIATED = 'initiated';
    case PROGRESS = 'progress';
    case DONE = 'done';
    case ABORTED = 'aborted';
}
