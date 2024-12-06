<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AttachmentNote extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'note',
        'status',
    ];

    protected $filterable = [
        'searchs' => [
            'note',
        ],
        'columns' => [
            'status',
        ],
    ];

    public function attachment_noteable(): MorphTo {
        return $this->morphTo();
    }
}
