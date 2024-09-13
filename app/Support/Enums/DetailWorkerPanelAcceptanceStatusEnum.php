<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum DetailWorkerPanelAcceptanceStatusEnum: string {
    use Arrayable;

    case ACCEPTED = 'accepted';
    case DECLINED = 'declined';
}
