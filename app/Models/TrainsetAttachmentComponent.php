<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainsetAttachmentComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainset_attachment_id',
        'carriage_panel_component_id',
        'total_required',
        'total_fulfilled',
        'total_failed',
    ];

    public function trainset_attachment(): BelongsTo
    {
        return $this->belongsTo(TrainsetAttachment::class);
    }

    public function carriage_panel_component(): BelongsTo
    {
        return $this->belongsTo(CarriagePanelComponent::class);
    }
}
