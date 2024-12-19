<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum TrainsetAttachmentHandlerHandlesEnum: string {
    use Arrayable, Translatable;

    case PREPARE = 'prepare';
    case SEND = 'send';
    case RECEIVE = 'receive';
}
