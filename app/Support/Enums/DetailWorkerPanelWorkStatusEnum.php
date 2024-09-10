<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum DetailWorkerPanelWorkStatusEnum: string {
    use Arrayable;

    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case FAILED = 'failed';
    case CANCELED = 'canceled';
}
