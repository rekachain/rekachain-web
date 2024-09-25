<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum DetailWorkerTrainsetWorkStatusEnum: string {
    use Arrayable;

    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
