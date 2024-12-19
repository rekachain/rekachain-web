<?php

namespace App\Models;

use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanelAttachmentHandler extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'user_id',
        'handler_name',
        'panel_attachment_id',
        'handles',
    ];
    protected $casts = [
        'handles' => PanelAttachmentHandlerHandlesEnum::class,
    ];
    protected $filterable = [
        'searchs' => ['handler_name', 'handles'],
        'columns' => ['panel_attachment_id', 'user_id', 'handles'],
    ];

    public function panel_attachment(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
