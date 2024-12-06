<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainsetAttachmentHandler extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'user_id',
        'handler_name',
        'trainset_attachment_id',
        'handles',
    ];
    protected $filterable = [
        'searchs' => ['handler_name', 'handles'],
        'columns' => ['trainset_attachment_id', 'user_id', 'handles'],
    ];

    public function trainset_attachment(): BelongsTo {
        return $this->belongsTo(TrainsetAttachment::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
