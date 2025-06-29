<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;
use App\Traits\Enums\Translatable;

enum PanelAttachmentStatusEnum: string {
    use Arrayable, Translatable;

    case MATERIAL_IN_TRANSIT = 'material_in_transit';
    case MATERIAL_ACCEPTED = 'material_accepted';
    case IN_PROGRESS = 'in_progress';
    case PENDING = 'pending';
    case DONE = 'done';
}
