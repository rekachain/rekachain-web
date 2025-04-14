<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum ProductProblemStatusEnum: string {
    use Arrayable, Translatable;

    case FIXED = 'fixed';
    case PROGRESS = 'progress';
    case CHANGED = 'changed';
    case DRAFT = 'draft';
}
