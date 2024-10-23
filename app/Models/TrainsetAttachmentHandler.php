<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainsetAttachmentHandler extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'trainset_attachment_id',
        'handles',
    ];

    public function trainset_attachment(): BelongsTo {
        return $this->belongsTo(TrainsetAttachment::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}