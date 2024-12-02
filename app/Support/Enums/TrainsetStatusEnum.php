<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum TrainsetStatusEnum: string {
    use Arrayable, Translatable;

    case DRAFT = 'draft';
    case PROGRESS = 'progress';
    case FAILED = 'failed';
    case DONE = 'done';
}
