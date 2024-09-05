<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanelAttachmentHandler extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'panel_attachment_id',
        'handles',
    ];

    public function panel_attachment(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
