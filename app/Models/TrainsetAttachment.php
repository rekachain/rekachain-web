<?php

namespace App\Models;

use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class TrainsetAttachment extends Model {
    use HasFactory;

    protected $fillable = [
        'trainset_id',
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

    public function trainset(): BelongsTo {
        return $this->belongsTo(Trainset::class);
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

    public function trainset_attachment_handlers(): HasMany {
        return $this->hasMany(TrainsetAttachmentHandler::class);
    }

    public function trainset_attachment_components(): HasMany {
        return $this->hasMany(TrainsetAttachmentComponent::class);
    }

    public function detail_worker_trainsets(): HasManyThrough {
        return $this->hasManyThrough(DetailWorkerTrainset::class, TrainsetAttachmentComponent::class, 'trainset_attachment_id', 'trainset_attachment_component_id', 'id', 'id');
    }

    public function attachment_notes(): MorphMany {
        return $this->morphMany(AttachmentNote::class, 'attachment_noteable');
    }
}
