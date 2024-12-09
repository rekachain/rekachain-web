<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum PanelAttachmentHandlerHandlesEnum: string {
    use Arrayable, Translatable;

    case PREPARE = 'prepare';
    case SEND = 'send';
    case RECEIVE = 'receive';
}
