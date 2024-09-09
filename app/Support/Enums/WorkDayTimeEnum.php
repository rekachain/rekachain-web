<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum WorkDayTimeEnum: string {
    use Arrayable;

    case WORK = 'work';
    case BREAK = 'break';
}
