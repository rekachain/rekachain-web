<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum FeedbackStatusEnum: string {
    use Arrayable;

    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}
