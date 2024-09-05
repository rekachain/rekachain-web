<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PanelAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'carriage_trainset_id',
        'carriage_panel_id',
        'source_workstation_id',
        'destination_workstation_id',
        'attachment_number',
        'qr_code',
        'qr_path',
        'current_step',
        'elapsed_time',
        'status',
        'panel_attachment_id',
        'supervisor_id',
    ];

    public function parent(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function child(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function source_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'source_workstation_id');
    }

    public function destination_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'destination_workstation_id');
    }

    public function carriage_panel(): BelongsTo {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function carriage_trainset(): BelongsTo {
        return $this->belongsTo(CarriageTrainset::class);
    }

    public function supervisor(): BelongsTo {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function handlers(): HasMany {
        return $this->hasMany(PanelAttachmentHandler::class);
    }
}
