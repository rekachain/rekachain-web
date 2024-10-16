<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum TrainsetAttachmentHandlerHandlesEnum: string
{
    use Arrayable;

    case PREPARE = 'prepare';
    case SEND = 'send';
    case RECEIVE = 'receive';
}
