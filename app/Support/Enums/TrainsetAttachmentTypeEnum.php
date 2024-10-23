<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum TrainsetAttachmentTypeEnum: string {
    use Arrayable;

    case MEKANIK = 'mekanik';
    case ELEKTRIK = 'elektrik';
}
