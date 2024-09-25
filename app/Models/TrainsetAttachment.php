<?php

namespace App\Models;

use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainsetAttachment extends Model {
    use HasFactory;

    protected $fillable = [
        'carriage_trainset_id',
        'source_workstation_id',
        'destination_workstation_id',
        'attachment_number',
        'qr_code',
        'qr_path',
        'elapsed_time',
        'trainset_attachment_id',
        'supervisor_id',
        'status',
    ];
    protected $casts = [
        'status' => TrainsetAttachmentStatusEnum::class,
    ];

    public function parent(): BelongsTo {
        return $this->belongsTo(TrainsetAttachment::class, 'trainset_attachment_id');
    }

    public function childs(): HasMany {
        return $this->hasMany(TrainsetAttachment::class, 'trainset_attachment_id');
    }

    public function carriage_trainset(): BelongsTo {
        return $this->belongsTo(CarriageTrainset::class, 'carriage_trainset_id');
    }

    public function source_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'source_workstation_id');
    }

    public function destination_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'destination_workstation_id');
    }

    public function supervisor(): BelongsTo {
        return $this->belongsTo(User::class, 'supervisor_id');
    }
}
