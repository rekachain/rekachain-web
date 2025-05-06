<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum ProductProblemCauseEnum: string {
    use Arrayable, Translatable;

    case WORKMAN_SHIP = 'workman_ship';
    case QUALITY = 'quality';
}
