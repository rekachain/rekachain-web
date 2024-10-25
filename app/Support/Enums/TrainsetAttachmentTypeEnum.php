<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum TrainsetAttachmentTypeEnum: string {
    use Arrayable;

    case MECHANIC = 'mechanic';
    case ELECTRIC = 'electric';
}
