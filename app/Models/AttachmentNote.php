<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AttachmentNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'status',
    ];

    public function attachment_noteable(): MorphTo
    {
        return $this->morphTo();
    }
}
