<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum DetailWorkerPanelAcceptanceStatusEnum: string {
    use Arrayable, Translatable;

    case ACCEPTED = 'accepted';
    case DECLINED = 'declined';
}
