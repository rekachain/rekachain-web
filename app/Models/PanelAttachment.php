<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class PanelAttachment extends Model {
    use HasFactory;

    protected $fillable = [
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

    public function trainset(): HasOneThrough {
        return $this->hasOneThrough(Trainset::class, CarriageTrainset::class, 'id', 'id', 'carriage_trainset_id', 'trainset_id');
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function childs(): HasMany {
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

    public function serial_panels(): HasMany {
        return $this->hasMany(SerialPanel::class);
    }

    public function supervisor(): BelongsTo {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function panel_attachment_handlers(): HasMany {
        return $this->hasMany(PanelAttachmentHandler::class);
    }
}
