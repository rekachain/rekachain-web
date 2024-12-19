<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum DetailWorkerTrainsetWorkStatusEnum: string {
    use Arrayable, Translatable;

    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
