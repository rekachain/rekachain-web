<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum PanelAttachmentHandlerHandlesEnum: string {
    use Arrayable;

    case PREPARE = 'prepare';
    case SEND = 'send';
    case RECEIVE = 'receive';
}
