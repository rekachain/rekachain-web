<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum DetailWorkerTrainsetAcceptanceStatusEnum: string {
    use Arrayable;

    case ACCEPTED = 'accepted';
    case DECLINED = 'declined';
}
