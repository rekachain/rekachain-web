<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum ReturnedProductStatusEnum: string {
    use Arrayable, Translatable;

    case REQUESTED = 'requested';
    case DRAFT = 'draft';
    case PROGRESS = 'progress';
    case DONE = 'done';
    case SCRAPPED = 'scrapped';
}
