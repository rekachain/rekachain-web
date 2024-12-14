<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum ProjectStatusEnum: string {
    use Arrayable;

    case DRAFT = 'draft';
    case PROGRESS = 'progress';
    case DONE = 'done';
}
