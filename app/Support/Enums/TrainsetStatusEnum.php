<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum TrainsetStatusEnum: string {
    use Arrayable;

    case DRAFT = 'draft';
    case PROGRESS = 'progress';
    case FAILED = 'failed';
}
